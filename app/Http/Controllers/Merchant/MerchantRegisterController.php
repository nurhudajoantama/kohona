<?php

namespace App\Http\Controllers\Merchant;

use Inertia\Inertia;
use App\Models\Merchant;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Status;

class MerchantRegisterController extends Controller
{

    public function index()
    {
        if (auth()->user()->merchant != null) {
            return redirect(route('merchants.wait'));
        }
        return Inertia::render('Merchant/MerchantRegister');
    }

    public function store(Request $request)
    {
        $request->merge([
            'slug' => Str::slug($request->name),
        ]);
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string',
            'slug' => 'required|string|max:255|unique:merchants',
        ]);
        $request->merge([
            'id' => auth()->user()->id,
        ]);
        Merchant::create($request->all());
        return redirect()->route('merchants.wait');
    }

    public function wait()
    {
        $merchant = Merchant::where('id', auth()->user()->id)->first();
        if ($merchant == null) {
            return redirect(route('merchants.register'));
        }
        if ($merchant->status_id == Status::acceptedId) {
            return redirect(route('merchants.dashboard.index'));
        }
        return Inertia::render('Merchant/MerchantWait', compact('merchant'));
    }
}
