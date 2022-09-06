<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

class UserSettingController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('UserSetting/Index', compact('user'));
    }

    public function update(Request $request)
    {
        User::find(auth()->id())->update($request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]));
        return redirect()->route('user.setting.index');
    }

    public function password()
    {
        return Inertia::render('UserSetting/ChangePassword');
    }

    public function passwordUpdate(Request $request)
    {
        $request->validate([
            'password' => ['required', function ($attribute, $value, $fail) {
                if (!Hash::check($value, auth()->user()->password)) {
                    return $fail(__('The current password is incorrect.'));
                }
            }],
            'new_password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::find(auth()->id())->update([
            'password' => Hash::make($request->new_password),
        ]);

        return redirect()->route('user.setting.index');
    }
}
