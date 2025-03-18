<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Helpers\QueryHelper;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request) {
        $queryParams = $request->all();

        try {
            $query = User::query();

            // Apply query filters
            QueryHelper::apply($query, $queryParams);

            $records = $query->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }

        return response()->json($records, 200);
    }

    public function show($id) {
        $record = User::find($id);

        return response()->json($record);
    }

    public function store(Request $request) {
        try {
            // check if email already exists
            $userExists = User::where('email', $request->input('email'))->exists();

            if ($userExists) {
                return response()->json([
                   'message' => 'User already exists.',
                ], 400);
            }

            // add default password
            $request['password'] = Hash::make($request->input('P@ssword123!'));

            $record = User::create($request->all());

            return response()->json($record);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, $id) {
        try {
            $user = User::find($id);
            $user->update($request->all());

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function destroy($id) {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'User not found.',
                ], 404);
            }

            // do not delete if the user is me
            if ($user->id == auth()->user()->id) {
                return response()->json([
                    'user' => auth()->user(),
                    'message' => 'You cannot delete your own account.',
                ], 400);
            }

            $user->delete();
            
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function paginate(Request $request) {
        $queryParams = $request->all();

        try {
            $query = User::query();

            // Apply query filters
            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            // search
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('email', 'LIKE', '%' . $search . '%')
                        ->orWhere('first_name', 'LIKE', '%' . $search . '%')
                        ->orWhere('middle_name', 'LIKE', '%' . $search . '%')
                        ->orWhere('last_name', 'LIKE', '%'. $search. '%')
                        ->orWhere('suffix', 'LIKE', '%'. $search. '%');
                });
            }

            $total = $query->count();

            // limit and offset
            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);
        
            $users = $query->get();

            return response()->json([
                'records' => $users,
                'info' => [
                    'total' => $total,
                    'pages' => ceil($total / $limit),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred. Kindly check all the parameters provided. ' . $e->getMessage(),
            ], 400);
        }
    }

    public function import(Request $request) {
        try {
            $info = [
                'new' => 0,
                'skipped' => 0
            ];

            $data = $request->input('data');
    
            foreach ($data as $user) {
                $email = $user['Email'] ?? null;
    
                // Validate and normalize data
                if (!$email) {
                    return response()->json(['message' => 'Email is required'], 400);
                }
    
                $userExists = User::where('email', $email)->exists();
    
                if (!$userExists) {
                    $info['new']++;

                    User::create([
                        'email' => strtolower($email),
                        'first_name' => $user['First Name'] ?? null,
                        'middle_name' => $user['Middle Name'] ?? null,
                        'last_name' => $user['Last Name'] ?? null,
                        'suffix' => $user['Suffix'] ?? null,
                        'password' => Hash::make('P@ssword123!'),
                    ]);
                } else {
                    $info['skipped']++;
                }
            }
    
            return response()->json([
                'message' => 'Users imported successfully',
                'info' => $info,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function getArchivedUser($id) {
        $record = User::onlyTrashed()->find($id);

        return response()->json($record);
    }

    public function restoreArchivedUser($id) {
        try {
            $record = User::onlyTrashed()->find($id);

            if (!$record) {
                return response()->json([
                    'message' => 'User not found.',
                ], 404);
            }

            $record->restore();

            return response()->json($record);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function getAllArchivedUsersPaginate(Request $request) {
        $queryParams = $request->all();

        try {
            $query = User::onlyTrashed();

            // Apply query filters
            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            // search
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('email', 'LIKE', '%' . $search . '%')
                        ->orWhere('first_name', 'LIKE', '%' . $search . '%')
                        ->orWhere('middle_name', 'LIKE', '%' . $search . '%')
                        ->orWhere('last_name', 'LIKE', '%'. $search. '%')
                        ->orWhere('suffix', 'LIKE', '%'. $search. '%');
                });
            }

            $total = $query->count();

            // limit and offset
            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);
        
            $users = $query->get();

            return response()->json([
                'records' => $users,
                'info' => [
                    'total' => $total,
                    'pages' => ceil($total / $limit),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred. Kindly check all the parameters provided. ' . $e->getMessage(),
            ], 400);
        }
    }
}
