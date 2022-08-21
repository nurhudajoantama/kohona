<?php

namespace App\Http\Middleware;

use App\Models\Status;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RedirectIfNotMerchant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $merchant = auth()->user()->merchant;
        if ($merchant == null) {
            return redirect(route('merchants.register'));
        }
        if ($merchant->status_id != Status::acceptedId) {
            return redirect(route('merchants.wait'));
        }
        return $next($request);
    }
}
