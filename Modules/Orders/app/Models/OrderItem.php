<?php

namespace Modules\Orders\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Orders\Database\Factories\OrderItemFactory;

use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class OrderItem extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'order_id', 'product_id', 'quantity', 'unit_price', 'subtotal'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(\Modules\Menu\Models\Product::class);
    }

    // protected static function newFactory(): OrderItemFactory
    // {
    //     // return OrderItemFactory::new();
    // }
}
