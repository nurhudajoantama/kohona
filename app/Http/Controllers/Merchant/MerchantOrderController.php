<?php

namespace App\Http\Controllers\Merchant;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MerchantOrderController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['user', 'status', 'orders', 'orders.product'])
            ->where('status_id', 2)
            ->whereHas('orders.product', function ($query) {
                $query->where('merchant_id', auth()->id());
            })->latest()->paginate(10);
        $transactions->getCollection()->transform(function ($transaction) {
            $transaction->_orders = $transaction->orders->where('product.merchant_id', '=', auth()->id())->values();
            $transaction->total = $transaction->_orders->sum(function ($order) {
                return $order->price * $order->quantity;
            });
            return $transaction;
        });
        return Inertia::render('Merchant/Dashboard/Order', compact('transactions'));
    }
}
