<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Pwa\PwaController;
use App\Http\Controllers\Settings\BillingController;
use App\Http\Controllers\SettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Menu\Models\Product;
use Modules\Orders\Models\Order;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    if (auth()->user()->is_super_admin && ! tenant()) {
        return redirect()->route('admin.dashboard');
    }

    $totalOrders = Order::count();
    $activeItems = Product::where('is_active', true)->count();

    // Assume 30% commission saved on total sales
    $totalSales = Order::whereIn('status', ['Completed', 'Delivered'])->sum('total_amount');
    $savedCommission = $totalSales * 0.30;

    return Inertia::render('Dashboard', [
        'kpis' => [
            'totalOrders' => $totalOrders,
            'activeItems' => $activeItems,
            'savedCommission' => $savedCommission,
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/settings/integrations', [SettingsController::class, 'integrations'])->name('settings.integrations');
    Route::post('/settings/integrations', [SettingsController::class, 'updateIntegrations']);
    Route::post('/settings/whatsapp/evolution/connect', [SettingsController::class, 'connectEvolution'])->name('settings.whatsapp.evolution.connect');
    Route::get('/settings/whatsapp/evolution/state', [SettingsController::class, 'checkEvolutionState'])->name('settings.whatsapp.evolution.state');
    Route::post('/settings/whatsapp/evolution/disconnect', [SettingsController::class, 'disconnectEvolution'])->name('settings.whatsapp.evolution.disconnect');
    Route::get('/settings/billing', [BillingController::class, 'index'])->name('settings.billing');
    Route::get('/settings/billing/invoices/{invoice}', [BillingController::class, 'show'])->name('settings.billing.invoices.show');
    Route::patch('/settings/business', [SettingsController::class, 'updateBusinessProfile'])->name('settings.business.update');
});

require __DIR__.'/auth.php';

Route::get('/test-tenancy', function () {
    return response()->json([
        'auth_check' => auth()->check(),
        'tenant_initialized' => tenancy()->initialized,
        'tenant' => tenant('id'),
    ]);
})->middleware(['auth', 'verified']);

// Public PWA Mini-App Routes
Route::group(['prefix' => 'order/{tenant_slug}'], function () {
    Route::get('/', [PwaController::class, 'exchangeTokenAndShowMenu'])->name('pwa.menu');
    Route::get('/manifest.json', [PwaController::class, 'manifest'])->name('pwa.manifest');
    Route::post('/checkout', [PwaController::class, 'submitOrder'])->name('pwa.checkout');
    Route::get('/track/{order_number}', [PwaController::class, 'trackOrder'])->name('pwa.track');
});
