<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Merchant;

class AdminMerchantController extends Controller
{
    public function index()
    {
        $merchants = Merchant::latest()->get();
        return Inertia::render('Admin/Dashboard/Merchant/Index', compact('merchants'));
    }

    public function activate(Merchant $merchant)
    {
        $merchant->update(['status_id' => 2]);
        return redirect()->route('admin.dashboard.merchants.index');
    }

    public function reject(Merchant $merchant)
    {
        $merchant->update(['status_id' => 3]);
        return redirect()->route('admin.dashboard.merchants.index');
    }
}
