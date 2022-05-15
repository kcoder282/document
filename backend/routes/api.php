<?php

use App\Http\Controllers\DanhMucController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NoiDungController;
use App\Http\Controllers\ThanhPhanDanhMucController;
use App\Http\Controllers\UploadImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('categories',DanhMucController::class);
Route::apiResource('categories_component',ThanhPhanDanhMucController::class);
Route::apiResource('content',NoiDungController::class);
Route::apiResource('users',LoginController::class);
Route::apiResource('images',UploadImageController::class);

Route::post('login',[LoginController::class,'login']);
Route::delete('logout/{token}',[LoginController::class,'logout']);
Route::get('remember', [LoginController::class, 'getData']);
