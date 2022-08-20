<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\IndexController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserSettingController;
use App\Http\Controllers\Product\ProductController;
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

Route::get('/', [IndexController::class, 'index'])->name('index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/user/settings')->name('user.setting.')->group(function () {
        Route::get('/', [UserSettingController::class, 'index'])->name('index');
        Route::post('/', [UserSettingController::class, 'update'])->name('update');

        Route::prefix('/change-password')->name('change-password.')->group(function () {
            Route::get('/', [UserSettingController::class, 'password'])->name('index');
            Route::post('/', [UserSettingController::class, 'passwordUpdate'])->name('update');
        });
    });

    Route::prefix('/carts')->name('carts.')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::post('/', [CartController::class, 'store'])->name('store');
        Route::delete('/{cart}', [CartController::class, 'destroy'])->name('destroy');

        Route::get('/checkout', fn () => redirect()->route('carts.index'));
        Route::post('/checkout', [CartController::class, 'checkout'])->name('checkout');
    });
});

Route::prefix('/products')->name('products.')->group(function () {
    // Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/{product}', [ProductController::class, 'show'])->name('show');
});



require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/merchants.php';
