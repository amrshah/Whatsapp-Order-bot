<?php

use Illuminate\Support\Facades\Route;
use Modules\Orders\Http\Controllers\OrdersController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('orders/history', [OrdersController::class, 'history'])->name('orders.history');
    Route::patch('orders/{order}/status', [OrdersController::class, 'updateStatus'])->name('orders.status.update');
    Route::resource('orders', OrdersController::class)->names('orders');
});
