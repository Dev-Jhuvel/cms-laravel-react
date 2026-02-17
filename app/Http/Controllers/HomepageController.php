<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    public function index()
    {
        $posts =  Post::with('postCategory')
            ->latest()
            ->where([
                'active'=> 1,
                'deleted'=> 0,
            ])
            ->where('image', '<>', '')
            ->get();

        $product_category =  ProductCategory::with('products')
            ->where([
                'active'=> 1,
                'deleted'=> 0,
            ])
            ->where('image', '<>', '')
            ->orderBy('name')
            ->get();

        // $products =  Product::with('productCategory')
        //     ->latest()
        //     ->where([
        //         'active'=> 1,
        //         'deleted'=> 0,
        //     ])
        //     ->where('image', '<>', '')
        //     ->get()
        //     ->groupBy(function($product){
        //         return $product->productCategory->name;
        //     })->sortBy(function($item, $key){
        //         return $key;
        //     });

        return response()->json([
            'posts' => $posts,
            // 'products' => $products,
            'product_category' => $product_category,
        ], 200);
    }
    public function menu(Request $request)
    {
        $product_category_id = $request->product_category_id;
        $products =  Product::with('productCategory')
            ->latest()
            ->where([
                'active'=> 1,
                'deleted'=> 0,
            ])
            ->when(isset($product_category_id), function($query) use ($product_category_id){
                $query->where('product_category_id', $product_category_id);
            })
            ->where('image', '<>', '')
            ->get()
            ->groupBy(function($product){
                return $product->productCategory->name;
            })->sortBy(function($item, $key){
                return $key;
            });

        return response()->json(['products' => $products], 200);
    }
}
