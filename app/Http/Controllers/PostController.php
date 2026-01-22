<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\UploadService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all()->latest();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, UploadService $service)
    {
        $url_data = $service->upload($request);
        if(isset($url_data['error'])){
            return response()->json($url_data, 400);
        }
        $request->image = $url_data['url'];
        $post = Post::create([
            'title'         => $request->title,
            'descriptions'  => $request->descriptions,
            'image'         => $request->image,
        ]);
        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return $post;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
       //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post->update($request->all());
        return response()->json($post, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }

    /**
     * Set it as deleted a  specified resource from storage.
     */
    public function delete(Post $post)
    {
        $post->update([
            'active' => 1,
            'deleted' => 1,
        ]);
        return response()->json(['message' => 'Post is deleted.'], 201);

    }
}
