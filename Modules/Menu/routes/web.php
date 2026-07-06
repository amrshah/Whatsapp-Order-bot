<?php

use Illuminate\Support\Facades\Route;
use Modules\Menu\Http\Controllers\MenuController;
use Modules\Menu\Http\Controllers\CategoryController;
use Modules\Menu\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('menus', MenuController::class)->names('menu');
});

Route::middleware(['auth', 'verified'])->prefix('menu')->name('menu.')->group(function () {
    Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);
    Route::resource('products', ProductController::class)->except(['create', 'show', 'edit']);
});
