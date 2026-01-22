<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register(Request $request){
        $validate = $request->validate([
            'name' => 'required|min:5|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8|max:30'
        ]);

        $user = User::create([
            'name' => $validate['name'],
            'email' => $validate['email'],
            'password' => Hash::make($validate['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
           'token' => $token,
           'user' => $user,
           'message' => 'Registration Successful.'
        ]);
   }

    public function login(Request $request){
        $credentials = $request->validate([ 
            'email' => 'required|email', 
            'password' => 'required',
        ]);

        if(!Auth::attempt($credentials)){
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout Successfully!']);
    }
}
