<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('name');
            $table->string('email');
            $table->string('contact')->nullable();
            $table->string('job_type');
            $table->integer('quantity');
            $table->string('specifications')->nullable();
            $table->string('file_path')->nullable();
            $table->string('original_filename')->nullable();
            $table->text('requirements')->nullable();
            $table->string('status')->default('pending');
            $table->text('admin_notes')->nullable();
            $table->decimal('quote_amount', 10, 2)->nullable();
            $table->timestamp('quoted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
