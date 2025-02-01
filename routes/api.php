<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('signup',[AuthController::class,'signup']);
Route::post('login',[AuthController::class,'login']);

Route::post('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('posts',BlogController::class);
});
