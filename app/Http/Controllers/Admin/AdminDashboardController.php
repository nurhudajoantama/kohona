<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Merchant;
use App\Models\AdminToken;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $adminTokens = AdminToken::with(['user'])->latest()->limit(2)->get();
        $merchants = Merchant::orderBy('status_id')->latest()->limit(2)->get();
        $transactions = Transaction::with(['user', 'status'])
            ->orderBy('status_id')->orderBy('created_at', 'desc')->limit(2)->get();
        return Inertia::render('Admin/Dashboard/Index', compact('adminTokens', 'merchants', 'transactions'));
    }
}
