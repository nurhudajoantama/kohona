<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Status;
use App\Models\Merchant;

class AdminMerchantController extends Controller
{
    public function index()
    {
        $merchants = Merchant::latest()->get();
        return Inertia::render('Admin/Dashboard/Merchant', compact('merchants'));
    }

    public function activate(Merchant $merchant)
    {
        $merchant->update(['status_id' => Status::acceptedId]);
        return redirect()->back();
    }

    public function reject(Merchant $merchant)
    {
        $merchant->update(['status_id' => Status::rejectedId]);
        return redirect()->back();
    }
}
