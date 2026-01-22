<?php

namespace App\Http\Controllers;

use Cloudinary\Cloudinary;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $result = $cloudinary->uploadApi()->upload($file->getRealPath(), ['folder' => 'bakeshop']);
            return response()->json(['url' => $result['secure_url']]);
        }
        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
