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
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        $tenantName = "Default Restaurant";
        $tenantId = \Illuminate\Support\Str::slug($tenantName);

        $tenant = \App\Models\Tenant::create([
            'id' => $tenantId,
            'name' => $tenantName,
        ]);

        $user = \App\Models\User::factory()->create([
            'name' => 'Restaurant Owner',
            'email' => 'admin@restaurant.com',
            'password' => bcrypt('password123'),
            'tenant_id' => $tenant->id,
        ]);

        // We can optionally initialize tenancy to ensure the role assignment works cleanly in scope if needed,
        // though Spatie roles in this app might be global.
        $user->assignRole('Owner');
    }
}
