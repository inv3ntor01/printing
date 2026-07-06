<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'service.view',
            'service.create',
            'service.edit',
            'service.delete',
            'order.view',
            'order.create',
            'order.edit',
            'order.delete',
            'order.approve',
            'file.upload',
            'file.download',
            'file.delete',
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',
            'report.view',
            'report.export',
            'settings.view',
            'settings.edit',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions($permissions);

        $staff = Role::firstOrCreate(['name' => 'staff']);
        $staff->syncPermissions([
            'service.view',
            'service.edit',
            'order.view',
            'order.edit',
            'order.approve',
            'file.upload',
            'file.download',
            'report.view',
        ]);

        $customer = Role::firstOrCreate(['name' => 'customer']);
        $customer->syncPermissions([
            'service.view',
            'order.create',
            'order.view',
            'file.upload',
            'file.download',
        ]);
    }
}
