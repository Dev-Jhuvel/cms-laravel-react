<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\UploadService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Product::with('productCategory')
            ->latest()
            ->where([
                'active'=> 1,
                'deleted'=> 0,
            ])
            ->when(!empty($request->product_category_id), function($query) use($request){
                $query->where('product_category_id', $request->product_category_id);
            })
            ->paginate(8);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, UploadService $service)
    {
        $url_data = $service->upload($request);
        if(isset($url_data['error'])){
            // return response()->json($url_data, 400);
        }
        $request->image = $url_data['url'] ?? '';
        $product = Product::create([
            'title'             => $request->title,
            'descriptions'      => $request->descriptions,
            'image'             => $request->image,
            'product_category_id'  => $request->product_category_id,
        ]);
        return response()->json($product, 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UploadService $service)
    {
        $product = Product::find($request->product_id);

        if(!$product){
            return response()->json(['message' => 'Product not Found.'], 404);
        }
        
        $url_data = $service->upload($request);
        if(isset($url_data['error'])){
            // return response()->json($url_data, 400);
        }
        $request->image = $url_data['url'] ?? '';
        $data = [
            'title'                 => $request->title,
            'descriptions'          => $request->descriptions,
            'product_category_id'   => $request->product_category_id,
        ];

        if(!empty($request->image)){
            $data['image'] = $request->image;
        }

        $product->update($data);
        
        return response()->json($product, 201);
    }

    /**
     * Set it as deleted a  specified resource from storage.
     */
    public function destroy($product_id)
    {
        $product = Product::find($product_id);
        
        if(!$product){
            return response()->json(['message' => 'Product not Found.'], 404);
        }

        $product->update([
            'active' => 0,
            'deleted' => 1,
        ]);
        return response()->json([$product, 'message' => 'Product is deleted.'], 201);
    }

    public function homePage()
    {
        return Product::with('productCategory')
            ->latest()
            ->where([
                'active'=> 1,
                'deleted'=> 0,
            ])
            ->where('image', '<>', '')
            // ->when(!empty($request->category_id), function($query) use($request){
            //     $query->where('category_id', $request->category_id);
            // })
            ->get();
    }
}
