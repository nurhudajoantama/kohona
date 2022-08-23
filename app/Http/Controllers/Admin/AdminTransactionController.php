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
                'status_id' => Status::acceptedId
            ]);
            $orders = $transaction->orders;
            foreach ($orders as $order) {
                $product = $order->product;
                $product->sold += $order->quantity;
                $product->save();

                $merchant = $product->merchant;
                $merchant->wallet_amount += $order->quantity * $order->price;
                $merchant->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return redirect()->back();
    }

    public function reject(Transaction $transaction)
    {
        try {
            DB::beginTransaction();
            $transaction->update([
                'status_id' => Status::rejectedId
            ]);
            $orders = $transaction->orders;
            foreach ($orders as $order) {
                $product = $order->product;
                $product->stock += $order->quantity;
                $product->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return redirect()->back();
    }
}
