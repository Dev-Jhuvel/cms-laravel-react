<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product_categories =  ProductCategory::withCount('posts')->where([
            'active' => 1,
            'deleted' => 0,
        ])->orderBy('name')->paginate(10);
        return response()->json($product_categories, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required'
        // |unique:categories,name
    ]);

        $product_categories = ProductCategory::create($validated);

        return response()->json($product_categories, 200);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate(['name' => 'required']);

        $product_categories = ProductCategory::find($request->id);

        if(!$product_categories){
            return response()->json(['message' => 'Product Category not Found.'], 404);
        }
        
        $product_categories->update($validated);

        return response()->json($product_categories, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($post_category_id)
    {
        $product_categories = ProductCategory::find($post_category_id);
        
        if(!$product_categories){
            return response()->json(['message' => 'Product Category not Found.'], 404);
        }
        
        $product_categories->update([
            'active' => 0,
            'deleted' => 1,
        ]);

        return response()->json(['message' => 'Product Category is deleted.'], 200);
    }
}