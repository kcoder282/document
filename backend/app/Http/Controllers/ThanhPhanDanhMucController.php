<?php

namespace App\Http\Controllers;

use App\Models\ThanhPhanDanhMuc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ThanhPhanDanhMucController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $thanhphandanhmuc = ThanhPhanDanhMuc::all();
        return $thanhphandanhmuc;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $orm = new ThanhPhanDanhMuc();
        $orm->danhmuc_id = $request->danhmuc_id;
        $orm->name = $request->name;
        $orm->icon = $request->icon;
        return $orm->save() ? ['type' => 'success'] : ['type' => 'error'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $thanhphandanhmuc = ThanhPhanDanhMuc::find($id);
        if ($thanhphandanhmuc) {
            return $thanhphandanhmuc;
        }
        return null;
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
        $orm = ThanhPhanDanhMuc::find($id);
        if ($orm) {
            $orm->name = $request->name;
            $orm->icon = $request->icon;
            return $orm->save() ? ['type' => 'success'] : ['type' => 'error'];
        } else return ['type' => 'error'];
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
        $orm = ThanhPhanDanhMuc::find($id);
        if ($orm) {
            if($orm->content !== null) Storage::delete($orm->content); 
            return $orm->delete() ? ['type' => 'success'] : ['type' => 'error'];
        }
        return ['type' => 'error'];
    }
}
