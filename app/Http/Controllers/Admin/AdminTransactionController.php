<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Status;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminTransactionController extends Controller
{
    public function index()
    {

        $requested = Transaction::where('status_id', Status::requestedId)->latest()->get();
        $active = Transaction::where('status_id', Status::acceptedId)->latest()->get();
        $rejected = Transaction::where('status_id', Status::rejectedId)->latest()->get();
        return Inertia::render('Admin/Dashboard/Transaction', compact('requested', 'active', 'rejected'));
    }

    public function changeStatus(Request $request, Transaction $transaction)
    {
        $request->validate([
            'status_id' => 'required|integer|exists:enum_statuses,id',
        ]);
        $transaction->update(['status_id' => $request->status_id]);
        return redirect()->back();
    }
}
