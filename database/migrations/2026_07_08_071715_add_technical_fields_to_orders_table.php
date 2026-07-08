<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('paper_stock')->nullable()->after('specifications');
            $table->decimal('width', 8, 2)->nullable()->after('paper_stock');
            $table->decimal('height', 8, 2)->nullable()->after('width');
            $table->integer('pages')->nullable()->after('height');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['paper_stock', 'width', 'height', 'pages']);
        });
    }
};
