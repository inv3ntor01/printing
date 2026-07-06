<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/print', [\App\Http\Controllers\PrintController::class, 'index'])->name('print');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
