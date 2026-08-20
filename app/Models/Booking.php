<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Crm\Models\Customer;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Booking extends Model
{
    use BelongsToTenant, HasFactory;

    protected $fillable = [
        'tenant_id',
        'customer_id',
        'service_id',
        'customer_name',
        'customer_phone',
        'booking_date',
        'booking_time',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'booking_date' => 'date',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
