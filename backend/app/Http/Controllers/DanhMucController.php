<?php

namespace App\Http\Controllers;

use App\Models\DanhMuc;
use App\Models\ThanhPhanDanhMuc;
use Illuminate\Http\Request;

class DanhMucController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $danhmuc = DanhMuc::all();
        foreach ($danhmuc as $value) {
            $value->thanhphan = ThanhPhanDanhMuc::where('danhmuc_id', $value->id)->get();
        }
        return $danhmuc;
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
        $orm = new DanhMuc();
        $orm->name = $request->name;
        $orm->icon = $request->icon;
        return $orm->save()?['type'=>'success']:['type'=>'error'];
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
        $danhmuc = DanhMuc::find($id);
        if($danhmuc){
            return $danhmuc;
        }return null;
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
        $orm = DanhMuc::find($id);
        if($orm){
            $orm->name = $request->name;
            $orm->icon = $request->icon;
            return $orm->save() ? ['type' => 'success'] : ['type' => 'error'];
        }else return ['type'=>'error'];
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
        $orm = DanhMuc::find($id);
        if ($orm) {
            return $orm->delete() ? ['type' => 'success']: ['type' => 'error'];  
        } return ['type' => 'error'];
    }
}
