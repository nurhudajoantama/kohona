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
        try {
            $this->updateCart($request->product_id, $request->quantity);
        } catch (\Exception $e) {
            return redirect()->back();
        }
        return redirect()->route('carts.index');
    }

    public function destroy(Cart $cart)
    {
        $product = $cart->product;
        try {
            DB::beginTransaction();
            $product->update([
                'stock' => $product->stock + $cart->quantity,
            ]);
            $cart->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
        return redirect()->route('carts.index');
    }

    public function checkout(Request $request)
    {
        $request->validate([
            '*.product_id' => 'required|exists:products,id|distinct',
            '*.quantity' => 'required|integer|min:1',
            '*.new' => 'boolean',
        ]);

        if (isset($request->all()[0]['new']) && $request->all()[0]['new']) {
            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->all()[0]['product_id'],
                'quantity' => $request->all()[0]['quantity'],
            ]);
        }

        $cartsId = [];
        try {
            DB::beginTransaction();
            foreach ($request->all() as $r) {
                $cart = $this->updateCart($r['product_id'], $r['quantity']);
                array_push($cartsId, $cart->id);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
        $carts = Cart::with(['product'])->whereIn('id', $cartsId)->get();
        return Inertia::render('Checkout', compact('carts'));
    }

    private function updateCart($product_id, $quantity)
    {
        $product = Product::find($product_id);
        $cart = Cart::where('user_id', auth()->id())->where('product_id', $product_id)->first();
        $stock = $product->stock + ($cart ? $cart->quantity : 0);
        if ($stock <  $quantity) {
            throw new \Exception('Stock is not enough');
        }
        try {
            DB::beginTransaction();
            if ($cart) {
                $cart->quantity = $quantity;;
                $cart->save();
            } else {
                Cart::create([
                    'user_id' => auth()->id(),
                    'product_id' => $product_id,
                    'quantity' => $quantity,
                ]);
            }
            $product->update([
                'stock' => $stock - $quantity,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return $cart;
    }
}
