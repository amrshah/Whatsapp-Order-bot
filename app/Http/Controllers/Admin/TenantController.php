<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = \App\Models\Tenant::with('domains')->latest()->get();

        return \Inertia\Inertia::render('Admin/Tenants/Index', [
            'tenants' => $tenants,
        ]);
    }

    public function edit(\App\Models\Tenant $tenant)
    {
        // Query the specific tenant's database for lightweight metrics
        // We temporarily initialize this tenant's environment
        $metrics = [
            'total_orders' => 0,
            'active_products' => 0,
        ];

        try {
            tenancy()->initialize($tenant);
            $metrics['total_orders'] = \Modules\Orders\Models\Order::count();
            $metrics['total_sales'] = \Modules\Orders\Models\Order::whereIn('status', ['Completed', 'Delivered'])->sum('total_amount');
            $metrics['active_products'] = \Modules\Menu\Models\Product::where('is_active', true)->count();
            tenancy()->end();
        } catch (\Exception $e) {
            \Log::error("Could not query metrics for tenant {$tenant->id}: " . $e->getMessage());
        }

        return \Inertia\Inertia::render('Admin/Tenants/Edit', [
            'tenant' => $tenant->load('domains'),
            'metrics' => $metrics,
        ]);
    }

    public function updateBilling(\Illuminate\Http\Request $request, \App\Models\Tenant $tenant)
    {
        $validated = $request->validate([
            'billing_model' => 'required|in:fixed,commission',
            'billing_rate' => 'required|numeric|min:0',
            'billing_frequency' => 'required|in:daily,weekly,monthly,manual',
        ]);

        $tenant->update($validated);

        return redirect()->back()->with('success', 'Billing configuration updated.');
    }

    public function generateInvoice(\App\Models\Tenant $tenant)
    {
        $amount = 0;
        $periodStart = $tenant->last_billed_at ? \Carbon\Carbon::parse($tenant->last_billed_at) : now()->subDays(7);
        $periodEnd = now();

        if ($tenant->billing_model === 'fixed') {
            $amount = $tenant->billing_rate;
        } elseif ($tenant->billing_model === 'commission') {
            tenancy()->initialize($tenant);
            $totalSales = \Modules\Orders\Models\Order::whereIn('status', ['Completed', 'Delivered'])
                ->whereBetween('created_at', [$periodStart, $periodEnd])
                ->sum('total_amount');
            $amount = $totalSales * ($tenant->billing_rate / 100);
            tenancy()->end();
        }

        if ($amount > 0) {
            \App\Models\Invoice::create([
                'tenant_id' => $tenant->id,
                'amount' => $amount,
                'status' => 'pending',
                'billing_period_start' => $periodStart,
                'billing_period_end' => $periodEnd,
                'due_date' => now()->addDays(7),
                'type' => $tenant->billing_model,
            ]);

            $tenant->update(['last_billed_at' => now()]);
            return redirect()->back()->with('success', 'Manual invoice generated successfully.');
        }

        return redirect()->back()->with('success', 'No invoice generated (amount is 0).');
    }

    public function orders(Request $request, \App\Models\Tenant $tenant)
    {
        $startDate = $request->query('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->query('end_date', now()->toDateString());

        tenancy()->initialize($tenant);
        
        $orders = \Modules\Orders\Models\Order::whereBetween('created_at', [
            \Carbon\Carbon::parse($startDate)->startOfDay(),
            \Carbon\Carbon::parse($endDate)->endOfDay()
        ])->latest()->get();

        $completedOrdersTotal = $orders->whereIn('status', ['Completed', 'Delivered'])->sum('total_amount');
        $expectedCommission = 0;
        
        if ($tenant->billing_model === 'commission') {
            $expectedCommission = $completedOrdersTotal * ($tenant->billing_rate / 100);
        } elseif ($tenant->billing_model === 'fixed') {
            $expectedCommission = $tenant->billing_rate; // Just to display something, though fixed rate doesn't depend on orders
        }

        tenancy()->end();

        return \Inertia\Inertia::render('Admin/Tenants/Orders', [
            'tenant' => $tenant->load('domains'),
            'orders' => $orders,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'stats' => [
                'total_completed_amount' => $completedOrdersTotal,
                'expected_commission' => $expectedCommission,
                'billing_model' => $tenant->billing_model,
                'billing_rate' => $tenant->billing_rate,
            ]
        ]);
    }
}
