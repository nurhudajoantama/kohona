<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->foreignId('id')->unique()->references('id')->on('users')->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('name')->index();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('wallet_amount')->default(0);
            $table->foreignId('status_id')->default(1)->nullable()->references('id')->on('statuses')->nullOnDelete();
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
        Schema::dropIfExists('merchants');
    }
};
