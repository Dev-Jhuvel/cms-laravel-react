<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Services\UploadService;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product_categories =  ProductCategory::withCount('products')->where([
            'active' => 1,
            'deleted' => 0,
        ])->orderBy('name')->paginate(10);
        return response()->json($product_categories, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, UploadService $uploadService)
    {
        $url_data = $uploadService->upload($request);
        if(isset($url_data['error'])){
            // return response()->json($url_data, 400);
        }

        $product_categories = ProductCategory::create([
            'name' => $request->name,
            'image' => $url_data['url'] ?? '',
        ]);

        return response()->json($product_categories, 200);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UploadService $uploadService)
    {

        $url_data = $uploadService->upload($request);
        if(isset($url_data['error'])){
            // return response()->json($url_data, 400);
        }

        // $validated = $request->validate(['name' => 'required']);

        $product_categories = ProductCategory::find($request->product_category_id);

        if(!$product_categories){
            return response()->json(['message' => 'Product Category not Found.'], 404);
        }
        
        $product_categories->update([
            'name' => $request->name,
            'image' => $url_data['url'],
        ]);

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