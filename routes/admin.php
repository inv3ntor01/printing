<?php

use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ServiceController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('orders', OrderController::class)->only(['index', 'show']);
    Route::get('services', [ServiceController::class, 'index'])->middleware('can:service.view')->name('services.index');
    Route::get('services/create', [ServiceController::class, 'create'])->middleware('can:service.create')->name('services.create');
    Route::post('services', [ServiceController::class, 'store'])->middleware('can:service.create')->name('services.store');
    Route::get('services/{service}/edit', [ServiceController::class, 'edit'])->middleware('can:service.edit')->name('services.edit');
    Route::match(['put', 'patch'], 'services/{service}', [ServiceController::class, 'update'])->middleware('can:service.edit')->name('services.update');
    Route::delete('services/{service}', [ServiceController::class, 'destroy'])->middleware('can:service.delete')->name('services.destroy');
});
