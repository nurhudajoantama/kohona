<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\AdminToken;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class AdminTokenController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin-access');
    }

    public function index()
    {
        $adminTokens = AdminToken::with(['user'])->get();
        return Inertia::render('Admin/Dashboard/AdminToken', compact('adminTokens'));
    }

    public function generate()
    {

        AdminToken::create([
            'token' => Str::random(60),
            'user_id' => auth()->user()->id,
        ]);
        return redirect()->route('dashboard.admin-tokens.index');
    }

    public function destroy(AdminToken $adminToken)
    {
        $adminToken->delete();
        return redirect()->route('dashboard.admin-tokens.index');
    }
}
