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

        if (User::where('email', 'staff@printing.test')->doesntExist()) {
            User::factory()->create([
                'name' => 'Staff User',
                'email' => 'staff@printing.test',
            ])->assignRole('staff');
        }

        if (User::where('email', 'customer@printing.test')->doesntExist()) {
            User::factory()->create([
                'name' => 'Customer User',
                'email' => 'customer@printing.test',
            ])->assignRole('customer');
        }
    }
}
