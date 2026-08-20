<?php

namespace App\Http\Controllers\Pwa;

use App\Enums\TenantCapability;
use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Bot\Services\CustomerPwaTokenService;
use Modules\Crm\Models\Customer;
use Modules\Menu\Models\Category;

class MiniAppController extends Controller
{
    /**
     * Resolve tenant context by slug.
     */
    protected function initializeTenant(string $slug): Tenant
    {
        $tenant = Tenant::find($slug);
        if (! $tenant || ! $tenant->is_active) {
            abort(404, 'Restaurant/Business not found.');
        }
        tenancy()->initialize($tenant);

        return $tenant;
    }

    /**
     * Canonical entry point for /app/{slug}
     */
    public function index(Request $request, string $slug)
    {
        $tenant = $this->initializeTenant($slug);

        // One-time exchange flow: consume incoming auth token
        if ($request->has('auth')) {
            $token = $request->query('auth');
            $payload = CustomerPwaTokenService::validateToken($token);

            if ($payload && $payload['tenant_id'] === $tenant->id) {
                // Store verified customer identity in secure HttpOnly session
                session(['pwa_customer_id' => $payload['customer_id']]);

                // 302 Redirect to clean URL
                return redirect($request->url());
            }
        }

        return $this->renderMiniApp($tenant, null);
    }

    /**
     * Entry point for specific experience, e.g. /app/{slug}/{experience}
     */
    public function experience(Request $request, string $slug, string $experience)
    {
        $tenant = $this->initializeTenant($slug);

        // One-time exchange flow: consume incoming auth token
        if ($request->has('auth')) {
            $token = $request->query('auth');
            $payload = CustomerPwaTokenService::validateToken($token);

            if ($payload && $payload['tenant_id'] === $tenant->id) {
                // Store verified customer identity in secure HttpOnly session
                session(['pwa_customer_id' => $payload['customer_id']]);

                // 302 Redirect to clean URL
                return redirect($request->url());
            }
        }

        return $this->renderMiniApp($tenant, $experience);
    }

    /**
     * Render the single-page PWA shell with necessary context.
     */
    protected function renderMiniApp(Tenant $tenant, ?string $experience): Response
    {
        $customer = null;
        $customerId = session('pwa_customer_id');
        if ($customerId) {
            $customer = Customer::with('addresses')->find($customerId);
        }

        // Support Secure Live Preview Mode matching original PwaController logic
        $status = 'published';
        if (request()->query('preview') === 'true' && auth()->check() && auth()->user()->tenant_id === $tenant->id) {
            $status = 'draft';
        }
        $settings = $tenant->settings($status);

        // Load active menu catalog if catalog capability is enabled
        $categories = [];
        if ($tenant->hasCapability(TenantCapability::Catalog)) {
            $categories = Category::where('is_active', true)
                ->with(['products' => function ($query) {
                    $query->where('is_active', true);
                }])
                ->get();
        }

        // Render legacy OrderMenu component directly if the experience is ordering (order)
        if ($experience === 'order' || $experience === 'ordering' || ($experience === null && $tenant->primary_experience === 'order')) {
            return Inertia::render('Pwa/OrderMenu', [
                'tenant' => [
                    'id' => $tenant->id,
                    'name' => $tenant->name,
                ],
                'customer' => $customer,
                'categories' => $categories,
                'settings' => $settings,
                'previewMode' => $status === 'draft',
            ]);
        }

        return Inertia::render('Pwa/MiniApp', [
            'tenant' => [
                'id' => $tenant->id,
                'name' => $tenant->name,
            ],
            'customer' => $customer,
            'categories' => $categories,
            'settings' => $settings,
            'currentExperience' => $experience,
        ]);
    }
}
