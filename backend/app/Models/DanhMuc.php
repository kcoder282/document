<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhMuc extends Model
{
    use HasFactory;
    protected $table = 'danh_mucs';
    public function ThanhPhanDanhMuc()
    {
        return $this->hasMany(ThanhPhanDanhMuc::class, 'danhmuc_id', 'id');
    }

}
