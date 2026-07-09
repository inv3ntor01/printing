<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderComment extends Model
{
    protected $fillable = ['order_id', 'user_id', 'body'];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
