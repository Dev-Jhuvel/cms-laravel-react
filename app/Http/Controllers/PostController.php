<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Post::with('category')
            ->latest()
            ->where([
                'user_id' => Auth::user()->id,
                'active'=> 1,
                'deleted'=> 0,
            ])
            ->when(!empty($request->category_id), function($query) use($request){
                $query->where('category_id', $request->category_id);
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
        $post = Post::create([
            'title'         => $request->title,
            'user_id'       => Auth::user()->id,
            'descriptions'  => $request->descriptions,
            'image'         => $request->image,
            'category_id'   => $request->category_id,
        ]);
        return response()->json($post, 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UploadService $service)
    {
        $post = Post::find($request->post_id);

        if(!$post){
            return response()->json(['message' => 'Post not Found.'], 404);
        }
        
        $url_data = $service->upload($request);
        if(isset($url_data['error'])){
            // return response()->json($url_data, 400);
        }
        $request->image = $url_data['url'] ?? '';
        $data = [
            'title'         => $request->title,
            'descriptions'  => $request->descriptions,
            'category_id'   => $request->category_id,
        ];

        if(!empty($request->image)){
            $data['image'] = $request->image;
        }

        $post->update($data);
        
        return response()->json($post, 201);
    }

    /**
     * Set it as deleted a  specified resource from storage.
     */
    public function destroy($post_id)
    {
        $post = Post::find($post_id);
        
        if(!$post){
            return response()->json(['message' => 'Post not Found.'], 404);
        }

        $post->update([
            'active' => 0,
            'deleted' => 1,
        ]);
        return response()->json([$post, 'message' => 'Post is deleted.'], 201);
    }

    public function homePage()
    {
        return Post::with('category')
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
