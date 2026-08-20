<?php

namespace App\Http\Middleware;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? array_merge($request->user()->toArray(), [
                    'is_super_admin' => $request->user()->isPlatformAdmin(),
                    'two_factor_enabled' => $request->user()->hasEnabledTwoFactorAuthentication(),
                    'two_factor_pending' => ! is_null($request->user()->two_factor_secret) && is_null($request->user()->two_factor_confirmed_at),
                ]) : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'tenant' => tenancy()->initialized ? [
                'id' => tenant('id'),
                'name' => tenant('name'),
                'hasPendingInvoices' => Invoice::where('tenant_id', tenant('id'))->where('status', 'pending')->exists(),
            ] : null,
        ];
    }
}
