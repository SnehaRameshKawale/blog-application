<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

// Serve the React Frontend
Route::get('/{any}', function () {
    return view('welcome'); // Ensure React is loaded
})->where('any', '.*');
