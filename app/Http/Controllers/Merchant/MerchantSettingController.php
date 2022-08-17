<?php

namespace App\Http\Controllers\Merchant;

use Inertia\Inertia;
use App\Models\Merchant;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class MerchantSettingController extends Controller
{
    public function index()
    {
        $merchant = Merchant::find(auth()->id());
        return Inertia::render('Merchant/Dashboard/Setting', compact('merchant'));
    }

    public function update(Request $request)
    {
        $request->merge([
            'slug' => Str::slug($request->name),
        ]);
        // dd($request->all());
        $merchant = Merchant::find(auth()->id());
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string',
            'slug' => 'required|unique:merchants,slug,' . $merchant->id,
            'image' => 'image|max:2048',
        ]);

        if ($request->file('image')) {
            if ($merchant->image) {
                Storage::delete($merchant->image);
            }
            $data['image'] =  $request->file('image')->store('merchant-image', 'public');
        }
        $merchant->update($data);
        return redirect()->back();
    }
}
