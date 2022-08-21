<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Status;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Merchant;
use Illuminate\Support\Facades\DB;

class AdminTransactionController extends Controller
{
    public function index()
    {

        $transactions = Transaction::with(['user', 'status'])
            ->orderBy('status_id')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Dashboard/Transaction', compact('transactions'));
    }

    public function accept(Transaction $transaction)
    {
        try {
            DB::beginTransaction();
            $transaction->update([
                'status_id' => 2
            ]);
            $orders = $transaction->orders;
            foreach ($orders as $order) {
                $merchant = $order->product->merchant;
                $merchant->wallet_amount += $order->quantity * $order->price;
                $merchant->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
        return redirect()->back();
    }

    public function reject(Transaction $transaction)
    {
        $transaction->update([
            'status_id' => 3
        ]);
        return redirect()->back();
    }
}