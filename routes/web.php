<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminMerchantController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Admin\AdminTokenController;
use App\Http\Controllers\Merchant\MerchantRegisterController;

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
    // DASHBOARD
    Route::prefix('/dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('index');
    });

    // ADMIN ROUTE
    Route::prefix('/admin/dashboard')->middleware(['can:admin-access'])->name('admin.dashboard.')->group(function () {
        // ADMIN TOKEN
        Route::prefix('/admin-tokens')->name('admin-tokens.')->group(function () {
            Route::get('/', [AdminTokenController::class, 'index'])->name('index');
            Route::post('/', [AdminTokenController::class, 'generate'])->name('generate');
            Route::delete('/{adminToken}', [AdminTokenController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('/merchants')->name('merchants.')->group(function () {
            Route::get('/', [AdminMerchantController::class, 'index'])->name('index');
            Route::post('/activate/{merchant}', [AdminMerchantController::class, 'activate'])->name('activate');
            Route::post('/reject/{merchant}', [AdminMerchantController::class, 'reject'])->name('reject');
        });
    });

    Route::prefix('/merchants')->name('merchants.')->group(function () {
        Route::get('/', function () {
            return 'index';
        })->name('index');

        // Register Merchant
        Route::get('/register', [MerchantRegisterController::class, 'index'])->name('register');
        Route::post('/register', [MerchantRegisterController::class, 'store'])->name('register.store');

        Route::get('/wait', [MerchantRegisterController::class, 'wait'])->name('wait');


        Route::prefix('/dashboard')->middleware(['merchant'])->name('dashboard.')->group(function () {
            Route::get('/', function () {
                return 'index';
            })->name('index');
        });
        // Route::get('/', function () {
        //     return Inertia::render('Merchant/Index');
        // })->name('index');
    });
});




require __DIR__ . '/auth.php';
