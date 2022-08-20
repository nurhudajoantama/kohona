<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'status_id' => 'required|exists:statuses,id',
            'address' => 'required|string',
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer',
        ]);
        try {
            DB::beginTransaction();
            $transaction = Transaction::create([
                'user_id' => auth()->id(),
                'status_id' => $request->status_id,
                'address' => $request->address,
                'bank_name' => $request->bank_name,
                'bank_account_number' => $request->bank_account_number,
            ]);
            $totalPrice = 0;
            foreach ($request->products as $product) {
                $p = Product::find($product['product_id']);
                $totalPrice += $p->price * $product['quantity'];
                $transaction->orders()->create([
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'price' => $p->price,
                ]);
            }
            $transaction->update(['total_price' => $totalPrice]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return;
        }
        return;
    }
}
