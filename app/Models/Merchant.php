<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MerchantStatus
{
    const requested = 'requested';
    const active = 'active';
    const rejected = 'rejected';
};

class Merchant extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'slug',
        'name',
        'image',
        'description',
        'status',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
