<?php

namespace App\Http\Controllers\Merchant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MerchantDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Merchant/Dashboard/Index');
    }
}
