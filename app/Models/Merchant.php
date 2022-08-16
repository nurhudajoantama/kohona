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

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function status()
    {
        switch ($this->status_id) {
            case 2:
                return 'active';
            case 3:
                return 'rejected';
            default:
                return 'requested';
        }
    }
}
