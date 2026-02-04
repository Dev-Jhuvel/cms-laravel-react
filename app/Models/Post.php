<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'user_id',
        'descriptions',
        'image',
        'category_id',
        'active',
        'deleted',
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
