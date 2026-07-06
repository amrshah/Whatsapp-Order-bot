<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);

        $user = \App\Models\User::firstOrCreate(
            ['email' => 'amr.shah@gmail.com'],
            [
                'name' => 'Amr Shah',
                'password' => \Illuminate\Support\Facades\Hash::make('Pass!123'),
                'tenant_id' => null,
            ]
        );

        if (!$user->hasRole('Super Admin')) {
            $user->assignRole($role);
        }
    }
}
