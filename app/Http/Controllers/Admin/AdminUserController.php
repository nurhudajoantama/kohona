<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\Password;

class AdminUserController extends Controller
{
    public function index()
    {
        $name = request('name');
        $email = request('email');
        $users = User::when($name, function ($query, $name) {
            return $query->where('name', 'like', '%' . $name . '%');
        })->when($email, function ($query, $email) {
            return $query->where('email', 'like', '%' . $email . '%');
        })->orderBy('updated_at', 'desc')->paginate(20);
        return Inertia::render('Admin/Dashboard/User', compact('users'));
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => [Password::defaults()],
        ]);
        if (isset($data['password'])) {
            if ($data['password'] == null) {
                unset($data['password']);
            } else {
                $data['password'] = bcrypt($data['password']);
            }
        }
        $user->update($data);
        return redirect()->back();
    }
}
