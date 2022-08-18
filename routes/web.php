<?php

use App\Http\Controllers\Merchant\MerchantController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserSettingController;
use App\Http\Controllers\Merchant\MerchantSettingController;
use App\Http\Controllers\Merchant\MerchantRegisterController;
use App\Http\Controllers\Merchant\MerchantDashboardController;

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

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::prefix('/merchants')->name('merchants.')->group(function () {
    Route::get('/', function () {
        return 'index';
    })->name('index');
    Route::get('/{merchant}', [MerchantController::class, 'show'])->name('show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/user/settings')->name('user.setting.')->group(function () {
        Route::get('/', [UserSettingController::class, 'index'])->name('index');
        Route::post('/', [UserSettingController::class, 'update'])->name('update');

        Route::prefix('/change-password')->name('change-password.')->group(function () {
            Route::get('/', [UserSettingController::class, 'password'])->name('index');
            Route::post('/', [UserSettingController::class, 'passwordUpdate'])->name('update');
        });
    });
});




require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/merchants.php';
