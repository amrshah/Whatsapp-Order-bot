<?php

namespace Modules\Menu\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Menu\Database\Factories\ProductFactory;

use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Product extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = ['category_id', 'name', 'description', 'price', 'image_url', 'is_active'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // protected static function newFactory(): ProductFactory
    // {
    //     // return ProductFactory::new();
    // }
}
