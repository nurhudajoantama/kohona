<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id',
        'slug',
        'name',
        'image',
        'description',
        'price',
        'stock',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }
}
