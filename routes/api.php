<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UploadController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::prefix('post')->middleware('auth:sanctum')->group(function (){
    Route::get('/{user_id}', [PostController::class, 'index']);
    Route::post('/store', [PostController::class, 'store']);
    Route::put('/update/{post_id}', [PostController::class, 'update']);
    Route::put('/delete', [PostController::class, 'delete']);

    // Route::post('/upload', [UploadController::class, 'upload']);
});