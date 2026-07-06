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
}
