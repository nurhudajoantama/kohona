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
        $statusId = request('status_id');
        $statusId = $statusId ? $statusId : null;
        $search = request('search');
        $merchants = Merchant::when($statusId, function ($query) use ($statusId) {
            return $query->where('status_id', $statusId);
        })->when($search, function ($query) use ($search) {
            return $query->where('name', 'like', '%' . $search . '%');
        })->orderBy('status_id')->paginate(10)->appends(request()->query());
        return Inertia::render('Admin/Dashboard/Merchant', compact('merchants', 'search', 'statusId'));
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
