<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadImageController extends Controller
{
    //
    public function store(Request $request)
    {
        //  
        $url=$request->url;
        // $contents = file_get_contents($url);
        // $name = substr($url, strrpos($url, '/') + 1);
        // Storage::put($name, $contents);
        $file = $request->url;
        $name = $file->getClientOriginalName();; 
        $imageName = $name;
        $request->url->move(storage_path('app/public'), $imageName);
        return $imageName;
    }    
}



