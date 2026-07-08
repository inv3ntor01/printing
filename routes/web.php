<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\ResumeCustomizationController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\CustomerOrderController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/print', [PrintController::class, 'index'])->name('print');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/contact-us', [ContactController::class, 'index'])->name('contact-us');
Route::post('/contact-us', [ContactController::class, 'store'])->name('contact-us.store');
Route::get('/privacy', [LegalController::class, 'privacy'])->name('privacy');
Route::get('/terms', [LegalController::class, 'terms'])->name('terms');
Route::get('/compliance', [LegalController::class, 'compliance'])->name('compliance');
Route::get('/ip-infringement', [LegalController::class, 'ip'])->name('ip');
Route::get('/resume-customization', [ResumeCustomizationController::class, 'index'])->name('resume-customization');
Route::get('/request-quote', [QuoteController::class, 'index'])->name('request-quote');
Route::post('/request-quote', [QuoteController::class, 'store'])->name('request-quote.store');

Route::prefix('auth')->middleware('guest')->group(function () {
    Route::get('/{provider}/redirect', [SocialiteController::class, 'redirect'])->whereIn('provider', ['google', 'facebook'])->name('auth.redirect');
    Route::get('/{provider}/callback', [SocialiteController::class, 'callback'])->whereIn('provider', ['google', 'facebook'])->name('auth.callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('orders/{order}', [CustomerOrderController::class, 'show'])->name('orders.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
