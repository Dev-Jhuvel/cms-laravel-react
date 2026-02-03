<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories =  Category::where([
            'active' => 1,
            'deleted' => 0,
        ])->orderBy('name')->paginate(10);
        return response()->json($categories, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required|unique:categories,name']);

        $category = Category::create($validated);

        return response()->json($category, 200);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate(['name' => 'required']);

        $category = Category::find($request->id);

        if(!$category){
            return response()->json(['message' => 'Category not Found.'], 404);
        }
        
        $category->update($validated);

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($category_id)
    {
        $category = Category::find($category_id);
        
        if(!$category){
            return response()->json(['message' => 'Category not Found.'], 404);
        }
        
        $category->update([
            'active' => 0,
            'deleted' => 1,
        ]);

        return response()->json(['message' => 'Category is deleted.'], 200);
    }
}
