<?php

namespace App\Http\Controllers;

use App\Models\PostCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post_categories =  PostCategory::withCount('posts')->where([
            'active' => 1,
            'deleted' => 0,
        ])->orderBy('name')->paginate(10);
        return response()->json($post_categories, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required'
        // |unique:categories,name
    ]);

        $post_categories = PostCategory::create($validated);

        return response()->json($post_categories, 200);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate(['name' => 'required']);

        $post_categories = PostCategory::find($request->id);

        if(!$post_categories){
            return response()->json(['message' => 'Post Category not Found.'], 404);
        }
        
        $post_categories->update($validated);

        return response()->json($post_categories, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($post_category_id)
    {
        $post_categories = PostCategory::find($post_category_id);
        
        if(!$post_categories){
            return response()->json(['message' => 'Post Category not Found.'], 404);
        }
        
        $post_categories->update([
            'active' => 0,
            'deleted' => 1,
        ]);

        return response()->json(['message' => 'Post Category is deleted.'], 200);
    }
}
