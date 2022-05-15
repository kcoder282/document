<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThanhPhanDanhMucsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thanh_phan_danh_mucs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('danhmuc_id')->constrained('danh_mucs')->cascadeOnDelete();
            $table->string('name');
            $table->string('icon');
            $table->string('content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('thanh_phan_danh_mucs');
    }
}
