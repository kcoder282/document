<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThanhPhanDanhMuc extends Model
{
    use HasFactory;
    protected $table = 'thanh_phan_danh_mucs';
    public function DanhMuc()
    {
        return $this->belongsTo('App\Models\DanhMuc', 'danhmuc_id', 'id');
    }
    public function NoiDung()
    {
        return $this->hasMany('App\Models\NoiDung', 'thanhphandanhmuc_id', 'id');
    }
}
