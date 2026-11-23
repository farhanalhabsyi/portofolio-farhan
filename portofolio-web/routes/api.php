<?php

use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route bawaan Sanctum — tetap dipertahankan
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API Portofolio Publik — hanya GET
Route::prefix('portfolio')->group(function () {
    Route::get('/profile', [PortfolioController::class, 'profile']);
    Route::get('/skills', [PortfolioController::class, 'skills']);
    Route::get('/projects', [PortfolioController::class, 'projects']);
    Route::get('/projects/{slug}', [PortfolioController::class, 'projectDetail']);
    Route::get('/experiences', [PortfolioController::class, 'experiences']);
    Route::get('/certificates', [PortfolioController::class, 'certificates']);
});