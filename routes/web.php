<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserSettingController;
use App\Http\Controllers\Admin\AdminTokenController;
use App\Http\Controllers\Admin\AdminMerchantController;
use App\Http\Controllers\Admin\AdminDashboardController;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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

    // ADMIN ROUTE
    Route::prefix('/admin/dashboard')->middleware(['can:admin-access'])->name('admin.dashboard.')->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('index');
        // ADMIN TOKEN
        Route::prefix('/admin-tokens')->name('admin-tokens.')->group(function () {
            Route::get('/', [AdminTokenController::class, 'index'])->name('index');
            Route::post('/', [AdminTokenController::class, 'generate'])->name('generate');
            Route::delete('/{adminToken}', [AdminTokenController::class, 'destroy'])->name('destroy');
        });

        // Merchant
        Route::prefix('/merchants')->name('merchants.')->group(function () {
            Route::get('/', [AdminMerchantController::class, 'index'])->name('index');
            Route::post('/activate/{merchant}', [AdminMerchantController::class, 'activate'])->name('activate');
            Route::post('/reject/{merchant}', [AdminMerchantController::class, 'reject'])->name('reject');
        });
    });

    // REFACTOR

    Route::prefix('/merchants')->name('merchants.')->group(function () {
        Route::get('/', function () {
            return 'index';
        })->name('index');

        // Register Merchant
        Route::get('/register', [MerchantRegisterController::class, 'index'])->name('register');
        Route::post('/register', [MerchantRegisterController::class, 'store'])->name('register.store');

        Route::get('/wait', [MerchantRegisterController::class, 'wait'])->name('wait');


        Route::prefix('/dashboard')->middleware(['merchant'])->name('dashboard.')->group(function () {
            Route::get('/', [MerchantDashboardController::class, 'index'])->name('index');
            Route::prefix('/settings')->name('settings.')->group(function () {
                Route::get('/', [MerchantSettingController::class, 'index'])->name('index');
                Route::post('/', [MerchantSettingController::class, 'update'])->name('update');
            });
        });
        // Route::get('/', function () {
        //     return Inertia::render('Merchant/Index');
        // })->name('index');
    });
});




require __DIR__ . '/auth.php';
