<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminTokenController;
use App\Http\Controllers\Admin\AdminMerchantController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminTransactionController;

// ADMIN ROUTE
Route::prefix('/admin/dashboard')->middleware(['auth', 'verified', 'can:admin-access'])->name('admin.dashboard.')->group(function () {
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
        Route::post('/{merchant}/activate', [AdminMerchantController::class, 'activate'])->name('activate');
        Route::post('/{merchant}/reject', [AdminMerchantController::class, 'reject'])->name('reject');
    });

    Route::prefix('/transactions')->name('transactions.')->group(function () {
        Route::get('/', [AdminTransactionController::class, 'index'])->name('index');
        Route::post('/{transaction}/status', [AdminTransactionController::class, 'changeStatus'])->name('status');
    });
});
