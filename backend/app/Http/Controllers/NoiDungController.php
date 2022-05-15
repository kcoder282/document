<?php

namespace App\Http\Controllers;

use App\Models\ThanhPhanDanhMuc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NoiDungController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = Str::random(40) . '.txt';
        $tp = ThanhPhanDanhMuc::find($request->id);
        if($tp->content !== null)
            Storage::delete($tp->content);

        $tp->content = $name;

        Storage::put($name, $request->content);
        return $tp->save() ? ['type' => 'success'] : ['type' => 'error'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tp = ThanhPhanDanhMuc::find($id);
        if($tp->content === null) return ' ';
        else try {
            return Storage::get($tp->content);
        } catch (\Throwable $th) {
            return ' ';
        };
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
       
    }
}
