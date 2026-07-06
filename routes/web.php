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
    $totalOrders = \Modules\Orders\Models\Order::count();
    $activeItems = \Modules\Menu\Models\Product::where('is_active', true)->count();
    
    // Assume 30% commission saved on total sales
    $totalSales = \Modules\Orders\Models\Order::where('status', 'Completed')->sum('total_amount');
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
});

require __DIR__.'/auth.php';

Route::get('/test-tenancy', function () {
    return response()->json([
        'auth_check' => auth()->check(),
        'tenant_initialized' => tenancy()->initialized,
        'tenant' => tenant('id'),
    ]);
})->middleware(['auth', 'verified']);
