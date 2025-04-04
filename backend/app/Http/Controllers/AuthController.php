<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    public function loginWithEmail(Request $request) {
        $userExists = User::where('email', $request->email)->first();

        if (!$userExists) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (!Hash::check($request->password, $userExists->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = $this->getUser($request->email);

        // Generate JWT token
        $accessToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $accessToken
        ], 200);
    }

    
    
    public function loginWithGoogle(Request $request) {
        // Retrieve user from Google using access token
        /** @disregard Undefined method 'userFromToken' */
        $googleUser = Socialite::driver('google')->userFromToken($request->access_token);

        // Check if the user already exists
        $user = $this->getUser($googleUser->getEmail());

        if (!$user) {
            // user not found error
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // Generate JWT token
        $accessToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $accessToken
        ], 200);
    }

    private function getUser($email) {
        return User::where('email', $email)->first();
    }
}
