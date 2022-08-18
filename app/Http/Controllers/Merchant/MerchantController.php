<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\EnumStatus;
use App\Models\Merchant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MerchantController extends Controller
{
    public function show(Merchant $merchant)
    {
        if ($merchant->status_id !== EnumStatus::activeId) {
            return abort(404);
        }
        $merchant->load('products');
        return Inertia::render('Merchant/Show', compact('merchant'));
    }
}
