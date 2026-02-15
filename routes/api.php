<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PostController;
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


Route::prefix('post_categories')->middleware('auth:sanctum')->group(function (){
    Route::get('/', [PostCategoryController::class, 'index']);
    Route::post('/store', [PostCategoryController::class, 'store']);
    Route::post('/update/{post_category_id}', [PostCategoryController::class, 'update']);
    Route::delete('/delete/{post_category_id}', [PostCategoryController::class, 'destroy']);
});

Route::prefix('products')->middleware('auth:sanctum')->group(function (){
    Route::post('/', [ProductController::class, 'index']);
    Route::post('/store', [ProductController::class, 'store']);
    Route::post('/update/{product_id}', [ProductController::class, 'update']);
    Route::delete('/delete/{product_id}', [ProductController::class, 'destroy']);
});

Route::prefix('product_categories')->middleware('auth:sanctum')->group(function (){
    Route::get('/', [ProductCategoryController::class, 'index']);
    Route::post('/store', [ProductCategoryController::class, 'store']);
    Route::post('/update/{product_category_id}', [ProductCategoryController::class, 'update']);
    Route::delete('/delete/{product_category_id}', [ProductCategoryController::class, 'destroy']);
});

Route::get('/', [HomepageController::class, 'index']);
