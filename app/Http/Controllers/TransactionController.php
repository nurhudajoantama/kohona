<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['orders', 'orders.product'])->where('user_id', auth()->id())->latest()->paginate(10);
        return Inertia::render('Transaction/Index', compact('transactions'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
            'carts_id' => 'required|array',
            'carts_id.*' => 'required|exists:carts,id|distinct',
        ]);
        try {
            DB::beginTransaction();
            $transaction = Transaction::create([
                'user_id' => auth()->id(),
                'address' => $request->address,
                'bank_name' => $request->bank_name,
                'bank_account_number' => $request->bank_account_number,
            ]);
            $totalPrice = 0;
            foreach ($request->carts_id as $cartId) {
                $cart = Cart::with(['product'])->find($cartId);
                $totalPrice += $cart->product->price * $cart->quantity;
                $product = $cart->product;
                $product->stock = $product->stock - $cart->quantity;
                $product->save();
                $transaction->orders()->create([
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                    'price' => $cart->product->price,
                ]);
                $cart->delete();
            }
            $transaction->update(['total_price' => $totalPrice]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('transactions.index');
    }
}
