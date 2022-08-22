<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index()
    {
        $products = Product::limit(5)->get();
        return Inertia::render('Index', compact('products'));
    }
}
