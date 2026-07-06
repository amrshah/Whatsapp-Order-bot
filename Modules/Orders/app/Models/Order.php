<?php

namespace Modules\Orders\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Orders\Database\Factories\OrderFactory;

use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Order extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'order_number', 'customer_phone', 'customer_name', 
        'total_amount', 'status', 'order_type', 'delivery_address', 'table_number'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // protected static function newFactory(): OrderFactory
    // {
    //     // return OrderFactory::new();
    // }
}
