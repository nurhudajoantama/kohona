<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::with(['product'])->where('user_id', auth()->id())->get();
        return Inertia::render('Cart', compact('carts'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $product = Product::find($request->product_id);
        $cart = Cart::where('user_id', auth()->id())->where('product_id', $request->product_id)->first();
        $stock = $product->stock + ($cart ? $cart->quantity : 0);
        if ($stock <  $request->quantity) {
            return redirect()->back();
        }
        try {
            if ($cart) {
                $cart->quantity = $request->quantity;;
                $cart->save();
            } else {
                Cart::create([
                    'user_id' => auth()->id(),
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity,
                ]);
            }
            $product->update([
                'stock' => $stock - $request->quantity,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
        return redirect()->route('carts.index');
    }

    public function destroy(Cart $cart)
    {
        $product = $cart->product;
        try {
            $product->update([
                'stock' => $product->stock + $cart->quantity,
            ]);
            $cart->delete();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
        return redirect()->route('carts.index');
    }
}
