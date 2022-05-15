<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoiDung extends Model
{
    use HasFactory;
    protected $table = 'noi_dungs';
    public function ThanhPhanDanhMuc()
    {
        return $this->belongsTo('App\Models\ThanhPhanDanhMuc', 'thanhphandanhmuc_id', 'id');
    }
}
