<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerMerchantTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'merchant_id',
        'total_price',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
