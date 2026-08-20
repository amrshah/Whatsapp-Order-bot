<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles
        // \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Admin']);
        Role::firstOrCreate(['name' => 'Owner']);
        Role::firstOrCreate(['name' => 'Manager']);
        Role::firstOrCreate(['name' => 'Staff']);
        Role::firstOrCreate(['name' => 'Customer']);
    }
}
