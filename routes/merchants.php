<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Merchant\MerchantProductController;
use App\Http\Controllers\Merchant\MerchantSettingController;
use App\Http\Controllers\Merchant\MerchantRegisterController;
use App\Http\Controllers\Merchant\MerchantDashboardController;

Route::prefix('/merchants')->middleware(['auth', 'verified'])->name('merchants.')->group(function () {
    // Register Merchant
    Route::get('/register', [MerchantRegisterController::class, 'index'])->name('register');
    Route::post('/register', [MerchantRegisterController::class, 'store'])->name('register.store');

    Route::get('/wait', [MerchantRegisterController::class, 'wait'])->name('wait');


    Route::prefix('/dashboard')->middleware(['merchant'])->name('dashboard.')->group(function () {
        Route::get('/', [MerchantDashboardController::class, 'index'])->name('index');

        Route::resource('/products', MerchantProductController::class)->except(['show', 'patch', 'update']);
        Route::post('/products/{product}/update', [MerchantProductController::class, 'update'])->name('products.update');

        Route::prefix('/settings')->name('settings.')->group(function () {
            Route::get('/', [MerchantSettingController::class, 'index'])->name('index');
            Route::post('/', [MerchantSettingController::class, 'update'])->name('update');
        });
    });
    // Route::get('/', function () {
    //     return Inertia::render('Merchant/Index');
    // })->name('index');
});
