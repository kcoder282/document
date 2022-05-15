<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    //
    public function index()
    {
        //
    }
    public function login(Request $request)
    {
        //
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            // The user is active, not suspended, and exists.
            $user = User::find(Auth::id());
            $user->remember_token = Str::random(100);
            return $user->save() ? $user : (object)[];
        }
        return (object)[];
    }
    public function logout($token)
    {
        //
        if ($user = User::where('remember_token', $token)->first()) {
            // The user is active, not suspended, and exists.
            $user->remember_token = '';
            return $user->save() ? ['type' => 'success'] : ['type' => 'error'];
        }
        return ['type' => 'error1'];
    }
    public function store(Request $request)
    {
        //  
        $orm = new User();
        $orm->name = $request->name;
        $orm->username = $request->username;
        $orm->password = bcrypt($request->password);
        return $orm->save() ? ['type' => 'success'] : ['type' => 'error'];
    }
    public function getData(Request $request){
        $orm = User::where('remember_token', $request->key)->first();
        return $orm??['id'=>0];
    }
}
