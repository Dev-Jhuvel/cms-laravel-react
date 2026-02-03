<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasUuids;
    protected $fillable = ['name','active', 'deleted'];

    public function posts(){
        return $this->BelongsTo(Post::class);
    }
}
