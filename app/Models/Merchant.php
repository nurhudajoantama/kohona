<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'slug',
        'name',
        'image',
        'description',
        'status_id',
    ];

    protected $with = ['status'];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}
