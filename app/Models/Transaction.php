<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'status_id',
        'address',
        'bank_name',
        'bank_account_number',
        'total_price',
    ];



    protected $with = ['status'];

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->id = IdGenerator::generate(['table' => $model->table, 'length' => 7, 'prefix' => 'INV']);
        });
    }

    public function perMerchantTransactions()
    {
        return $this->hasMany(PerMerchantTransaction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
