<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
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


Route::prefix('posts')->middleware('auth:sanctum')->group(function (){
    Route::post('/', [PostController::class, 'index']);
    Route::post('/store', [PostController::class, 'store']);
    Route::post('/update/{post_id}', [PostController::class, 'update']);
    Route::delete('/delete/{post_id}', [PostController::class, 'destroy']);
});
Route::get('/', [PostController::class, 'homePage']);


Route::prefix('categories')->middleware('auth:sanctum')->group(function (){
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/store', [CategoryController::class, 'store']);
    Route::post('/update/{category_id}', [CategoryController::class, 'update']);
    Route::delete('/delete/{category_id}', [CategoryController::class, 'destroy']);
});
