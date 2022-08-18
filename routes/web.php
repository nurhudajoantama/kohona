<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserSettingController;
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
