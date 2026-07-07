<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    if (auth()->user()->is_super_admin && !tenant()) {
        return redirect()->route('admin.dashboard');
    }

    $totalOrders = \Modules\Orders\Models\Order::count();
    $activeItems = \Modules\Menu\Models\Product::where('is_active', true)->count();
    
    // Assume 30% commission saved on total sales
    $totalSales = \Modules\Orders\Models\Order::whereIn('status', ['Completed', 'Delivered'])->sum('total_amount');
    $savedCommission = $totalSales * 0.30;

    return Inertia::render('Dashboard', [
        'kpis' => [
            'totalOrders' => $totalOrders,
            'activeItems' => $activeItems,
            'savedCommission' => $savedCommission,
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/settings/integrations', [\App\Http\Controllers\SettingsController::class, 'integrations'])->name('settings.integrations');
    Route::post('/settings/integrations', [\App\Http\Controllers\SettingsController::class, 'updateIntegrations']);
    Route::get('/settings/billing', [\App\Http\Controllers\Settings\BillingController::class, 'index'])->name('settings.billing');
    Route::get('/settings/billing/invoices/{invoice}', [\App\Http\Controllers\Settings\BillingController::class, 'show'])->name('settings.billing.invoices.show');
    Route::patch('/settings/business', [\App\Http\Controllers\SettingsController::class, 'updateBusinessProfile'])->name('settings.business.update');
});

require __DIR__.'/auth.php';

Route::get('/test-tenancy', function () {
    return response()->json([
        'auth_check' => auth()->check(),
        'tenant_initialized' => tenancy()->initialized,
        'tenant' => tenant('id'),
    ]);
})->middleware(['auth', 'verified']);

