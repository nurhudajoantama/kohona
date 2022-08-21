<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

abstract class EnumStatus
{
    const requested = 'requested';
    const active = 'active';
    const rejected = 'rejected';

    const requestedId = 1;
    const activeId = 2;
    const rejectedId = 3;

    public static function all()
    {
        return [
            [
                'id' => self::requestedId,
                'status' => self::requested,
            ],
            [
                'id' => self::activeId,
                'status' => self::active,
            ],
            [
                'id' => self::rejectedId,
                'status' => self::rejected,
            ],
        ];
    }
};

class Status extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'status'];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    const requested = 'requested';
    const active = 'active';
    const rejected = 'rejected';

    const requestedId = 1;
    const activeId = 2;
    const rejectedId = 3;

    public static function statusAll()
    {
        return [
            [
                'id' => self::requestedId,
                'status' => self::requested,
            ],
            [
                'id' => self::activeId,
                'status' => self::active,
            ],
            [
                'id' => self::rejectedId,
                'status' => self::rejected,
            ],
        ];
    }
}
