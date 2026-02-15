<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'image',
        'descriptions',
        'product_category_id',
        'active',
        'deleted',
    ];

    public function productCategory(){
        return $this->belongsTo(ProductCategory::class);
    }
}
