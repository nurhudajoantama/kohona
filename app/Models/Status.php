<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'status'];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }


    // Status
    const requested = 'requested';
    const accepted = 'accepted';
    const rejected = 'rejected';

    const requestedId = 1;
    const acceptedId = 2;
    const rejectedId = 3;

    public static function statusAll()
    {
        return [
            [
                'id' => self::requestedId,
                'status' => self::requested,
            ],
            [
                'id' => self::acceptedId,
                'status' => self::accepted,
            ],
            [
                'id' => self::rejectedId,
                'status' => self::rejected,
            ],
        ];
    }
}
