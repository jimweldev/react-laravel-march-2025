<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/auth/google-login', [AuthController::class, 'loginWithGoogle']);

Route::middleware('auth:sanctum')->group(function () {
    // users
    Route::get('/users/paginate', [UserController::class, 'paginate']);
    Route::resource('users', UserController::class);
});