<?php

use App\Enums\UserRole;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Seed the owner role to ensure it exists for assignment
    Role::firstOrCreate(['name' => UserRole::Owner->value, 'guard_name' => 'web']);
});

test('social auth redirects to google', function () {
    Socialite::fake('google');

    $response = $this->get('/auth/google/redirect');

    $response->assertRedirect();
});

test('social auth redirects to facebook', function () {
    Socialite::fake('facebook');

    $response = $this->get('/auth/facebook/redirect');

    $response->assertRedirect();
});

test('social auth callback registers new user and creates tenant and role', function () {
    $fakeUser = SocialiteUser::fake([
        'id' => 'google-12345',
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'avatar' => 'https://example.com/avatar.jpg',
    ]);

    Socialite::fake('google', $fakeUser);

    $response = $this->get('/auth/google/callback');

    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticated();

    // Verify user was created in the database with social attributes
    $user = User::where('email', 'john@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->provider_name)->toBe('google');
    expect($user->provider_id)->toBe('google-12345');
    expect($user->avatar)->toBe('https://example.com/avatar.jpg');

    // Verify tenant was created
    expect($user->tenant_id)->not->toBeNull();
    $tenant = Tenant::find($user->tenant_id);
    expect($tenant)->not->toBeNull();
    expect($tenant->name)->toBe("John's Restaurant");
    expect($tenant->id)->toBe('johns-restaurant');

    // Verify Owner role was assigned
    expect($user->hasRole(UserRole::Owner->value))->toBeTrue();
});

test('social auth callback maps existing user by email', function () {
    // Create an existing user
    $existingUser = User::factory()->create([
        'email' => 'john@example.com',
        'name' => 'John Original',
        'provider_name' => null,
        'provider_id' => null,
    ]);

    $fakeUser = SocialiteUser::fake([
        'id' => 'google-12345',
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'avatar' => 'https://example.com/avatar.jpg',
    ]);

    Socialite::fake('google', $fakeUser);

    $response = $this->get('/auth/google/callback');

    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticated();

    // Verify user was updated and not duplicated
    $usersCount = User::where('email', 'john@example.com')->count();
    expect($usersCount)->toBe(1);

    $user = User::where('email', 'john@example.com')->first();
    expect($user->id)->toBe($existingUser->id);
    expect($user->provider_name)->toBe('google');
    expect($user->provider_id)->toBe('google-12345');
    expect($user->avatar)->toBe('https://example.com/avatar.jpg');
});
