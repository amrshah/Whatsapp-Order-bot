<?php

namespace Modules\Crm\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;
// use Modules\Crm\Database\Factories\CustomerFactory;

class Customer extends Model
{
    use HasFactory, BelongsToTenant;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'phone',
        'total_orders',
        'total_spent',
        'last_order_date',
    ];

    // protected static function newFactory(): CustomerFactory
    // {
    //     // return CustomerFactory::new();
    // }
}
