<?php

use App\Http\Controllers\Dashboard\AdminTokenController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::prefix('/dashboard')->middleware(['auth', 'verified'])->name('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/Index');
    })->name('index');

    Route::prefix('/admin-tokens')->name('admin-tokens.')->group(function () {
        Route::get('/', [AdminTokenController::class, 'index'])->name('index');
        Route::post('/', [AdminTokenController::class, 'generate'])->name('generate');
        Route::delete('/{adminToken}', [AdminTokenController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__ . '/auth.php';
