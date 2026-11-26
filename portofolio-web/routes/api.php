
<?php

use App\Http\Controllers\Api\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Autentikasi Admin
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

// Route bawaan Sanctum — tetap dipertahankan
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API Admin — CRUD Proyek (wajib autentikasi Sanctum)
Route::middleware('auth:sanctum')
    ->prefix('admin')
    ->group(function () {
        Route::apiResource('projects', AdminProjectController::class);
    });

// API Portofolio Publik
Route::prefix('portfolio')->group(function () {
    Route::get('/profile', [PortfolioController::class, 'profile']);
    Route::get('/skills', [PortfolioController::class, 'skills']);
    Route::get('/projects', [PortfolioController::class, 'projects']);
    Route::get('/projects/{slug}', [PortfolioController::class, 'projectDetail']);
    Route::get('/experiences', [PortfolioController::class, 'experiences']);
    Route::get('/certificates', [PortfolioController::class, 'certificates']);

    Route::post('/messages', [PortfolioController::class, 'storeMessage'])
        ->middleware('throttle:5,1');
});
