<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
            ]
        );

        // Checking if there is error or not
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Validation Error",
                'error' => $validator->errors()->all(),
            ], 401);
        }

        //create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json([
            'status' => true,
            'message' => "User registered successfully",
        ], 200);
    }

    public function login(Request $request)
    {
        $validateUser = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required',
            ]
        );

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation fails',
                'error' => $validateUser->errors()->all(),
            ]);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Authentication successful
            $authUser = Auth::user();

            return response()->json([
                'status' => true,
                'id' => $authUser->id,
                'message' => 'Login successful',
                'token' => $authUser->createToken("authToken")->plainTextToken,
                'token_type' => 'bearer',
            ],200);
        } else {
            return response()->json([
                'status' => false,
                'error' => 'Email or Password is wrong',
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => "User logout successfully",
        ], 200);
    }
}
