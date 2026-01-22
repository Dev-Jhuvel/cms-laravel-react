<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Illuminate\Http\Request;

class UploadService
{
    public function upload(Request $request)
    {
        $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $result = $cloudinary->uploadApi()->upload($file->getRealPath(), ['folder' => 'cms']);
            return ['url' => $result['secure_url']];
        }
        return ['error' => 'No file uploaded'];
    }
}
