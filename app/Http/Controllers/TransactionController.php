<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Merchant;
use App\Models\PerMerchantTransaction;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['perMerchantTransactions', 'perMerchantTransactions.orders', 'perMerchantTransactions.merchant', 'perMerchantTransactions.orders.product'])
            ->where('user_id', auth()->id())->latest()->paginate(10);
        return Inertia::render('Transaction/Index', compact('transactions'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
            'carts' => 'required|array',
            'carts.*' => 'required|array',
            'carts.*.merchant_id' => 'required',
            'carts.*.carts_id' => 'required|array',
            'carts.*.carts_id.*' => 'required',
        ]);

        $transactions = [
            'user_id' => auth()->id(),
            'address' => $request->address,
            'bank_name' => $request->bank_name,
            'bank_account_number' => $request->bank_account_number,
            'total_price' => 0,
            'per_merchant_transactions' => [],
        ];
        $newProducts = [];
        $carts_id = [];
        foreach ($request->carts as $r_cart) {
            $carts = Cart::with('product')->where('user_id', auth()->id())->whereIn('id', $r_cart['carts_id'])->get();
            if ($carts->count() != count($r_cart['carts_id'])) {
                throw new \Exception('Cart not found');
            }
            $perMerchantTransaction = [
                'merchant_id' => $r_cart['merchant_id'],
                'total_price' => 0,
                'orders' => [],
            ];
            foreach ($carts as $cart) {
                if ($cart->product->stock < $cart->quantity) {
                    throw new \Exception('Stock is not enough');
                }
                if ($cart->product->merchant_id != $r_cart['merchant_id']) {
                    throw new \Exception('Unauthorized');
                }
                $perMerchantTransaction['total_price'] += $cart->product->price * $cart->quantity;
                $perMerchantTransaction['orders'][] = [
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                    'price' => $cart->product->price,
                ];
                $newProducts[] = [
                    ...$cart->product->toArray(),
                    'stock' => $cart->product->stock - $cart->quantity,
                ];
                $carts_id[] = $cart->id;
            }
            $transactions['total_price'] += $perMerchantTransaction['total_price'];
            $transactions['per_merchant_transactions'][] = $perMerchantTransaction;
        }

        try {
            DB::beginTransaction();
            $n_transaction = Transaction::create($transactions);
            foreach ($transactions['per_merchant_transactions'] as $perMerchantTransaction) {
                $n_perMerchantTransaction = $n_transaction->perMerchantTransactions()->create($perMerchantTransaction);
                $n_perMerchantTransaction->orders()->createMany($perMerchantTransaction['orders']);
                Product::upsert($newProducts, ['id'], ['stock']);
            }
            Cart::destroy($carts_id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('transactions.index');
    }
}
