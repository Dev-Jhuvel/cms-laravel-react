<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasUuids;
    protected $fillable = ['name', 'image', 'active', 'deleted'];

    public function products(){
        return $this->hasMany(Product::class);
    }
}
