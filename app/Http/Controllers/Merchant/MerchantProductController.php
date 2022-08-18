<?php

namespace App\Http\Controllers\Merchant;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class MerchantProductController extends Controller
{
    public function index()
    {
        $products = Product::where('merchant_id', auth()->id())->latest()->get();
        return Inertia::render('Merchant/Dashboard/Product/Index', compact('products'));
    }

    public function create()
    {
        return Inertia::render('Merchant/Dashboard/Product/FormProduct');
    }

    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->name)]);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug',
            'image' => 'image|max:2048',
            'description' => 'required|string',
            'price' => 'required|integer',
            'stock' => 'required|min:1|integer',
        ]);
        if ($request->file('image')) {
            $data['image'] = $request->file('image')->store('product-image', 'public');
        }
        $data['merchant_id'] = auth()->id();
        $product = Product::create($data);
        return redirect()->route('merchants.dashboard.products.edit', $product->slug);
    }

    public function edit(Product $product)
    {
        $update = true;
        return Inertia::render('Merchant/Dashboard/Product/FormProduct', compact('product', 'update'));
    }

    public function update(Request $request, Product $product)
    {
        if ($request->has('name')) {
            $request->merge(['slug' => Str::slug($request->name)]);
        }
        $data = $request->validate([
            'name' => 'string|max:255',
            'slug' => 'string|unique:products,slug,' . $product->id,
            'image' => 'image|max:2048',
            'description' => 'string',
            'price' => 'integer',
            'stock' => 'integer',
        ]);
        if ($request->file('image')) {
            if ($product->image) {
                Storage::delete($product->image);
            }
            $data['image'] = $request->file('image')->store('product-image', 'public');
        }
        $product->update($data);
        return redirect()->route('merchants.dashboard.products.edit', $product->slug);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back();
    }
}
