<?php

namespace App\Http\Controllers\Merchant;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PerMerchantTransaction;
use App\Models\Status;

class MerchantOrderController extends Controller
{
    public function index()
    {
        $transactions = PerMerchantTransaction::with(['transaction', 'transaction.user' => function ($query) {
            $query->without('merchant');
        }, 'orders', 'orders.product'])
            ->where('merchant_id', auth()->id())
            ->whereHas('transaction', function ($query) {
                $query->where('status_id', Status::acceptedId);
            })
            ->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Merchant/Dashboard/Order', compact('transactions'));
    }
}
