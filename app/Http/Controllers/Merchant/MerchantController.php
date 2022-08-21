<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\Status;
use App\Models\Merchant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MerchantController extends Controller
{
    public function show(Merchant $merchant)
    {
        if ($merchant->status_id !== Status::acceptedId) {
            return abort(404);
        }
        $merchant->load('products');
        return Inertia::render('Merchant/Show', compact('merchant'));
    }
}
