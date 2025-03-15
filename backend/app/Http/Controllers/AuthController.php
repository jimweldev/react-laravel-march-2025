<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class AuthController extends Controller {
    public function loginWithGoogle(Request $request) {
        // Retrieve user from Google using access token
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
