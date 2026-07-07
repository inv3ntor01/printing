<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/print', [\App\Http\Controllers\PrintController::class, 'index'])->name('print');
Route::get('/services', [\App\Http\Controllers\ServicesController::class, 'index'])->name('services');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
