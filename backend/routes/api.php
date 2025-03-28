<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/auth/google-login', [AuthController::class, 'loginWithGoogle']);

Route::middleware('auth:sanctum')->group(function () {
    // users
    Route::get('/users/paginate', [UserController::class, 'paginate']);
    Route::post('/users/import', [UserController::class, 'import']);

    Route::get('/users/{id}/archived', [UserController::class, 'getArchivedUser']);
    Route::post('/users/{id}/archived/restore', [UserController::class, 'restoreArchivedUser']);
    Route::get('/users/archived/paginate', [UserController::class, 'getAllArchivedUsersPaginate']);

    Route::patch('/users/{id}/change-password', [UserController::class, 'changePassword']);
    Route::patch('/users/{id}/profile', [UserController::class, 'updateProfile']);
    Route::post('/users/{id}/profile/avatar', [UserController::class, 'updateProfileAvatar']);

    Route::resource('users', UserController::class);
});