<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Merchant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
    {
        $cartRole = function ($query) {
            $query->where('user_id', auth()->id());
        };
        $carts = Merchant::with(['products' => function ($query) use ($cartRole) {
            $query->whereHas('carts', $cartRole);
        }, 'products.carts' => $cartRole])->whereHas('products.carts', $cartRole)->get();
        return Inertia::render('Cart', compact('carts'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        try {
            DB::beginTransaction();
            $product = Product::find($request->product_id);
            $cart = Cart::where('user_id', auth()->id())->where('product_id', $request->product_id)->first();
            if ($product->stock <  $request->quantity) {
                throw new \Exception('Stock is not enough');
            }
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
            DB::commit();
        } catch (\Exception $e) {
            throw $e;
        }
        return redirect()->route('carts.index');
    }

    public function destroy(Cart $cart)
    {
        $cart->delete();
        return redirect()->back();
    }

    public function checkout(Request $request)
    {
        $request->validate([
            '*.product_id' => 'required|exists:products,id|distinct',
            '*.quantity' => 'required|integer|min:1',
            '*.new' => 'boolean',
        ]);

        if (isset($request->all()[0]['new']) && $request->all()[0]['new']) {
            $product = Product::find($request->all()[0]['product_id']);
            if ($product->stock < $request->all()[0]['quantity']) {
                return redirect()->back();
            }
            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->all()[0]['product_id'],
                'quantity' => $request->all()[0]['quantity'],
            ]);
        }

        $cartsId = [];
        try {
            DB::beginTransaction();
            $carts = Cart::with(['product'])->where('user_id', auth()->id())->get();
            foreach ($request->all() as $r) {
                // $cart = $this->updateCart($r['product_id'], $r['quantity']);
                $cart = $carts->where('product_id', $r['product_id'])->first();
                if ($cart->product->stock < $r['quantity']) {
                    throw new \Exception('Stock is not enough');
                }
                $cart->quantity = $r['quantity'];
                $cart->save();

                array_push($cartsId, $cart->id);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        $cartRole = function ($query) use ($cartsId) {
            $query->whereIn('id', $cartsId);
        };
        $carts = Merchant::with(['products' => function ($query) use ($cartRole) {
            $query->whereHas('carts', $cartRole);
        }, 'products.carts' => $cartRole])->whereHas('products.carts', $cartRole)->get();

        return Inertia::render('Checkout', compact('carts'));
    }
}
