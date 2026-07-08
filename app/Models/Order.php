<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'contact',
        'job_type',
        'quantity',
        'specifications',
        'paper_stock',
        'width',
        'height',
        'pages',
        'file_path',
        'original_filename',
        'requirements',
        'status',
        'admin_notes',
        'quote_amount',
        'payment_status',
        'quoted_at',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'quote_amount' => 'decimal:2',
            'quoted_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
