<?php

use App\Enums\BusinessType;
use App\Models\Booking;
use App\Models\Service;
use App\Models\Tenant;
use App\Models\User;
use App\Services\TenantCapabilityService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('clinic tenant can manage services catalog', function () {
    $tenant = Tenant::create(['id' => 'dr-smith-clinic', 'name' => "Dr Smith's Clinic"]);
    app(TenantCapabilityService::class)->applyPreset($tenant, BusinessType::Clinic);

    $user = User::factory()->create(['tenant_id' => $tenant->id]);

    // Access Services index
    $this->actingAs($user)
        ->get('/services')
        ->assertOk();

    // Create a new Service
    $response = $this->actingAs($user)
        ->post('/services', [
            'name' => 'General Consultation',
            'description' => '30 minute health checkup',
            'duration_minutes' => 30,
            'price' => 75.00,
            'is_active' => true,
        ]);

    $response->assertRedirect('/services');

    $this->assertDatabaseHas('services', [
        'tenant_id' => $tenant->id,
        'name' => 'General Consultation',
        'price' => 75.00,
    ]);
});

test('tenant without services capability cannot access services management', function () {
    $tenant = Tenant::create(['id' => 'pizza-hub', 'name' => 'Pizza Hub']);
    app(TenantCapabilityService::class)->applyPreset($tenant, BusinessType::Restaurant);

    $user = User::factory()->create(['tenant_id' => $tenant->id]);

    $this->actingAs($user)
        ->get('/services')
        ->assertForbidden();
});

test('clinic tenant can manage bookings and update status', function () {
    $tenant = Tenant::create(['id' => 'law-firm-alex', 'name' => "Alex's Law Firm"]);
    app(TenantCapabilityService::class)->applyPreset($tenant, BusinessType::LawFirm);

    $user = User::factory()->create(['tenant_id' => $tenant->id]);

    $service = Service::create([
        'tenant_id' => $tenant->id,
        'name' => 'Legal Consultation',
        'duration_minutes' => 60,
        'price' => 150.00,
    ]);

    $booking = Booking::create([
        'tenant_id' => $tenant->id,
        'service_id' => $service->id,
        'customer_name' => 'John Doe',
        'customer_phone' => '+1234567890',
        'booking_date' => '2026-09-01',
        'booking_time' => '14:00',
        'status' => 'pending',
    ]);

    // Access Bookings page
    $this->actingAs($user)
        ->get('/bookings')
        ->assertOk();

    // Confirm Booking
    $this->actingAs($user)
        ->patch("/bookings/{$booking->id}/status", [
            'status' => 'confirmed',
        ])
        ->assertRedirect('/bookings');

    expect($booking->refresh()->status)->toBe('confirmed');
});

test('pwa allows customer appointment booking submission', function () {
    $tenant = Tenant::create(['id' => 'salon-chic', 'name' => 'Chic Salon']);
    app(TenantCapabilityService::class)->applyPreset($tenant, BusinessType::Salon);

    $service = Service::create([
        'tenant_id' => $tenant->id,
        'name' => 'Haircut & Styling',
        'duration_minutes' => 45,
        'price' => 50.00,
    ]);

    $response = $this->post("/app/{$tenant->id}/book", [
        'customer_name' => 'Sarah Connor',
        'customer_phone' => '+1987654321',
        'service_id' => $service->id,
        'booking_date' => '2026-09-15',
        'booking_time' => '11:00',
        'notes' => 'Looking for layered haircut',
    ]);

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'Appointment request submitted successfully.',
        ]);

    $this->assertDatabaseHas('bookings', [
        'tenant_id' => $tenant->id,
        'customer_name' => 'Sarah Connor',
        'status' => 'pending',
    ]);
});
