<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'per_merchant_transaction_id',
        'product_id',
        'quantity',
        'price',
    ];

    public function perMerchantTransaction()
    {
        return $this->belongsTo(PerMerchantTransaction::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
