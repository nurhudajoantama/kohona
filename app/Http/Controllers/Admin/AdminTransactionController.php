<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Status;
use App\Models\Product;
use App\Models\Merchant;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminTransactionController extends Controller
{
    public function index()
    {
        $search_id = request('id');
        $search_user = request('user');

        $transactions = Transaction::with(['user', 'status'])
            ->when($search_id, function ($query, $search_id) {
                return $query->where('id', 'like', '%' . $search_id . '%');
            })->when($search_user, function ($query, $search_user) {
                return $query->whereHas('user', function ($query) use ($search_user) {
                    return $query->where('name', 'like', '%' . $search_user . '%');
                });
            })->orderBy('status_id')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Dashboard/Transaction', compact('transactions'));
    }

    public function accept(Transaction $transaction)
    {
        $transaction->load([
            'perMerchantTransactions',
            'perMerchantTransactions.orders',
            'perMerchantTransactions.merchant',
            'perMerchantTransactions.orders.product'
        ]);

        $newMerchants = [];
        $newProducts = [];

        foreach ($transaction->perMerchantTransactions as $perMerchantTransaction) {
            $newMerchant = $perMerchantTransaction->merchant->toArray();
            unset($newMerchant['status']);
            $newMerchant['wallet_amount'] += $perMerchantTransaction->total_price;
            $newMerchants[] = $newMerchant;
            foreach ($perMerchantTransaction->orders as $order) {
                $newProduct = $order->product->toArray();
                $newProduct['sold'] += $order->quantity;
                $newProducts[] = $newProduct;
            }
        }
        try {
            DB::beginTransaction();
            $transaction->update([
                'status_id' => Status::acceptedId,
            ]);
            Merchant::upsert($newMerchants, ['id'], ['wallet_amount']);
            Product::upsert($newProducts, ['id'], ['sold']);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return redirect()->back();
    }

    public function reject(Transaction $transaction)
    {
        $transaction->load([
            'perMerchantTransactions',
            'perMerchantTransactions.orders',
            'perMerchantTransactions.orders.product'
        ]);
        $newProducts = [];
        foreach ($transaction->perMerchantTransactions as $perMerchantTransaction) {
            foreach ($perMerchantTransaction->orders as $order) {
                $newProduct = $order->product->toArray();
                $newProduct['stock'] += $order->quantity;
                $newProducts[] = $newProduct;
            }
        }

        try {
            DB::beginTransaction();
            $transaction->update([
                'status_id' => Status::rejectedId
            ]);
            Product::upsert($newProducts, ['id'], ['stock']);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return redirect()->back();
    }
}
