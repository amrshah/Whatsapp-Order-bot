<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('Starting Database Seeder...');

        $this->command->info('Seeding Roles and Permissions...');
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        

        $this->command->info('Seeding Super Admin...');
        $this->call([
            SuperAdminSeeder::class,
        ]);

        $tenantName = "Default Restaurant";
        $tenantId = \Illuminate\Support\Str::slug($tenantName);

        $this->command->info("Creating Default Tenant: {$tenantName}");
        $tenant = \App\Models\Tenant::create([
            'id' => $tenantId,
            'name' => $tenantName,
        ]);

        $this->command->info('Creating Restaurant Owner User...');
        $user = \App\Models\User::create([
            'name' => 'Restaurant Owner',
            'email' => 'admin@restaurant.com',
            'password' => bcrypt('password123'),
            'tenant_id' => $tenant->id,
            'email_verified_at' => now(),
        ]);

        $this->command->info('Assigning Owner Role to User...');
        // We can optionally initialize tenancy to ensure the role assignment works cleanly in scope if needed,
        // though Spatie roles in this app might be global.
        $user->assignRole('Owner');
        
        $this->command->info('Database Seeding Completed Successfully!');
    }
}
