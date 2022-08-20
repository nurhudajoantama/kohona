<?php

namespace App\Http\Controllers\Product;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        $search = request('search');
        $products = Product::where('name', 'LIKE', "%{$search}%")->get();
        return Inertia::render('Product/Index', compact('products', 'search'));
    }

    public function show(Product $product)
    {
        $product->load('merchant');
        $cart = Cart::where('user_id', auth()->id())->where('product_id', $product->id)->first();
        return Inertia::render('Product/Show', compact('product', 'cart'));
    }
}
