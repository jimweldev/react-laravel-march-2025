<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;

class CheckToken
{
    public function handle(Request $request, Closure $next)
    {
        try {
            // Check if access token is valid
            $user = JWTAuth::parseToken()->authenticate();

            if ($user) {
                return $next($request);
            }
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Invalid token',
                'error' => $e->getMessage(),
            ], 401);
        }
    }
}

