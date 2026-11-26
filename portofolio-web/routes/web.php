<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

// Halaman utama portofolio
Route::get('/', [HomeController::class, 'index']);

// Halaman Login Admin
Route::view('/admin/login', 'admin.login')
    ->name('admin.login');

// Dashboard Admin
Route::view('/admin/dashboard', 'admin.dashboard')
    ->name('admin.dashboard');
