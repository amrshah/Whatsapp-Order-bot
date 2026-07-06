<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'verified', \App\Http\Middleware\IsSuperAdmin::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/tenants', [\App\Http\Controllers\Admin\TenantController::class, 'index'])->name('tenants.index');
    Route::get('/tenants/{tenant}/edit', [\App\Http\Controllers\Admin\TenantController::class, 'edit'])->name('tenants.edit');
});
