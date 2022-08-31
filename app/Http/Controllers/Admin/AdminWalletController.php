<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\TransferWallet;
use App\Http\Controllers\Controller;

class AdminWalletController extends Controller
{
    public function index()
    {
        $transfers = TransferWallet::with(['merchant'])->latest()->paginate(10);
        return Inertia::render('Admin/Dashboard/Wallet', compact('transfers'));
    }
}
