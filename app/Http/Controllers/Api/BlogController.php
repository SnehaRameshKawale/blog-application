<?php

namespace App\Http\Controllers\Api;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;

class BlogController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $posts = Blog::all();
        return $this->sendResponse(['posts' => $posts], "All fetched data");
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make(
            $request->all(),
            [
                'title' => 'required',
                'description' => 'required',
                'image' => 'required|mimes:png,jpg,jpeg,gif',
            ]
        );

        if ($validate->fails()) {
            return $this->sendError("Validation error", $validate->errors()->all(), 401);
        }

        $img = $request->image;
        $ext = $img->getClientOriginalExtension();
        $image_name = time() . '.' . $ext;
        $img->move(public_path() . '/uploads', $image_name);

        $post = Blog::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $image_name,
        ]);

        return $this->sendResponse($post, "Successfully stored new post");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $posts = Blog::select(['id', 'title', 'description', 'image'])->where(['id'=>$id])->get();
        return $this->sendResponse(['posts' => $posts], "All fetched data");

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate = Validator::make(
            $request->all(),
            [
                'title' => 'required',
                'description' => 'required',
                'image' => 'required|mimes:jpg,jpeg,png,gif',
            ]
        );

        if ($validate->fails()) {
            return $this->sendError("Validation failed", $validate->errors()->all());
        }

        $img = $request->image;
        $ext = $img->getClientOriginalExtension();
        $image_name = time() . '.' . $ext;


        $old_img_name = Blog::where('id', $id)->pluck('image')->first();

        $post = Blog::where(['id' => $id])->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $image_name,
        ]);

        if ($old_img_name != $image_name) {
            $img->move(public_path() . '/uploads', $image_name);
        }

        return $this->sendResponse($post, "Blog updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Blog::where(['id' => $id])->first();
        if (!$post) {
            return $this->sendError("Post id not found");

        }

        $imagePath = Blog::select('image')->where('id', $id)->first();  // Use first() to get a single result
        $filePath = public_path() . '/uploads/' . $imagePath->image;  // Ensure there's a / between uploads and the image name

        if (file_exists($filePath)) {
            unlink($filePath);  // Delete the file
        }

        $post->delete();

        return $this->sendResponse($post, "Post deleted successfully");
    }
}
