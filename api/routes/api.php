<?php

use App\Models\User;
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
Route::middleware('auth:sanctum')->post('/resend', function (Request $request) {
    $user = User::where('email', $request->email);

    if ($user) {
        $request->user()->sendEmailVerificationNotification();
    }

    return response()->json([], 200);
});


require_once __DIR__ . '/fortify.php';
