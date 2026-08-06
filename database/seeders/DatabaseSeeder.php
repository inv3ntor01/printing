<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        if (User::where('email', 'admin@printing.test')->doesntExist()) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@printing.test',
            ])->assignRole('admin');
        }
    }
}
