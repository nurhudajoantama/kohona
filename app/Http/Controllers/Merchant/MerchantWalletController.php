<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\TransferWallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MerchantWalletController extends Controller
{
    public function index()
    {
        $transfers = TransferWallet::where('merchant_id', auth()->id())->latest()->paginate(10);
        return Inertia::render('Merchant/Dashboard/Wallet', compact('transfers'));
    }

    public function withdraw(Request $request)
    {
        $merchant = auth()->user()->merchant;
        $request->validate([
            'amount' => [
                'required', 'numeric', 'min:100000',
                function ($attribute, $value, $fail) use ($merchant) {
                    if ($value > $merchant->wallet_amount) {
                        $fail('Wallet amount is not enough');
                    }
                }
            ],
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
        ]);
        try {
            DB::beginTransaction();
            $merchant->wallet_amount -= $request->amount;
            $merchant->save();
            TransferWallet::create([
                'merchant_id' => $merchant->id,
                'amount' => $request->amount,
                'bank_name' => $request->bank_name,
                'bank_account_number' => $request->bank_account_number,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return redirect()->back();
    }
}
