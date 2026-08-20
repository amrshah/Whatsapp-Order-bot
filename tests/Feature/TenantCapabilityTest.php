<?php

use App\Capability\CapabilityRegistry;
use App\Capability\PwaExperienceResolver;
use App\Enums\BusinessType;
use App\Enums\TenantCapability;
use App\Exceptions\CapabilityDependencyCycleException;
use App\Exceptions\CapabilityNotEnabledException;
use App\Exceptions\InvalidPrimaryExperienceException;
use App\Models\Tenant;
use App\Services\TenantCapabilityService;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    Tenant::query()->delete();

    $this->tenant = Tenant::create([
        'id' => 'test-salon',
        'name' => 'Test Salon',
        'is_active' => true,
    ]);

    tenancy()->initialize($this->tenant);
    $this->service = new TenantCapabilityService;
});

test('preset application seeds capabilities and sets primary experience', function () {
    // 1. Apply Salon Preset
    $this->service->applyPreset($this->tenant, BusinessType::Salon);

    // Salon preset has: Services, Booking, Staff, Payments capabilities
    // Primary experience: book
    expect($this->tenant->fresh()->business_type)->toBe(BusinessType::Salon->value);
    expect($this->tenant->fresh()->primary_experience)->toBe('book');

    expect($this->tenant->hasCapability(TenantCapability::Services))->toBeTrue();
    expect($this->tenant->hasCapability(TenantCapability::Booking))->toBeTrue();
    expect($this->tenant->hasCapability(TenantCapability::Staff))->toBeTrue();
    expect($this->tenant->hasCapability(TenantCapability::Payments))->toBeTrue();

    // Catalog is NOT part of Salon preset
    expect($this->tenant->hasCapability(TenantCapability::Catalog))->toBeFalse();
});

test('enabling capability automatically enables transitive dependencies', function () {
    // Kds depends on Ordering which depends on Catalog.
    // Let's enable Kds on an empty tenant.
    expect($this->tenant->hasCapability(TenantCapability::Kds))->toBeFalse();

    $this->tenant->enableCapability(TenantCapability::Kds);

    expect($this->tenant->hasCapability(TenantCapability::Kds))->toBeTrue();
    expect($this->tenant->hasCapability(TenantCapability::Ordering))->toBeTrue();
    expect($this->tenant->hasCapability(TenantCapability::Catalog))->toBeTrue();
});

test('disabling capability throws exception if active dependents exist', function () {
    // Enable Kds (which resolves Ordering and Catalog)
    $this->tenant->enableCapability(TenantCapability::Kds);

    // Cannot disable Catalog because Ordering (and thus Kds) depends on it
    expect(fn () => $this->tenant->disableCapability(TenantCapability::Catalog))
        ->toThrow(RuntimeException::class, "Cannot disable 'catalog': the following active capabilities depend on it: ordering");

    // Cannot disable Ordering because Kds depends on it
    expect(fn () => $this->tenant->disableCapability(TenantCapability::Ordering))
        ->toThrow(RuntimeException::class, "Cannot disable 'ordering': the following active capabilities depend on it: kds");

    // Can disable Kds since nothing depends on it
    $this->tenant->disableCapability(TenantCapability::Kds);
    expect($this->tenant->hasCapability(TenantCapability::Kds))->toBeFalse();
});

test('stale primary_experience is reset to null when capability providing it is disabled', function () {
    // Salon preset sets primary_experience to 'book' (provided by Booking capability)
    $this->service->applyPreset($this->tenant, BusinessType::Salon);
    expect($this->tenant->fresh()->primary_experience)->toBe('book');

    // Disabling Booking is allowed because nothing depends on it
    $this->tenant->disableCapability(TenantCapability::Booking);

    // primary_experience must be reset to null because Booking (which provides 'book') was disabled
    expect($this->tenant->fresh()->primary_experience)->toBeNull();
});

test('primary_experience is validated and invalid value throws exception', function () {
    // Enable booking first
    $this->tenant->enableCapability(TenantCapability::Booking);

    // 'book' is valid because Booking is enabled
    $this->service->validatePrimaryExperience($this->tenant, 'book');

    // 'order' is invalid because Catalog/Ordering is not enabled
    expect(fn () => $this->service->validatePrimaryExperience($this->tenant, 'order'))
        ->toThrow(InvalidPrimaryExperienceException::class, "Cannot set primary experience to 'order': no active capability provides this experience.");
});

test('syncing capabilities resolves dependencies and removes unused capabilities', function () {
    // Enable booking and services
    $this->tenant->enableCapability(TenantCapability::Booking);

    // Now sync to only have Catalog and Ordering (Ordering will resolve Catalog)
    $this->service->syncCapabilities($this->tenant, [TenantCapability::Ordering]);

    expect($this->tenant->hasCapability(TenantCapability::Ordering))->toBeTrue();
    expect($this->tenant->hasCapability(TenantCapability::Catalog))->toBeTrue();

    // Booking and Services should have been removed
    expect($this->tenant->hasCapability(TenantCapability::Booking))->toBeFalse();
    expect($this->tenant->hasCapability(TenantCapability::Services))->toBeFalse();
});

test('capability cycle detection throws exception', function () {
    // We will dynamically alter the static registry definitions to simulate a dependency cycle for testing.
    CapabilityRegistry::resetForTesting();
    // Re-boot to default definitions
    CapabilityRegistry::boot();

    // Reflection to force a dependency cycle
    $reflection = new ReflectionClass(CapabilityRegistry::class);
    $prop = $reflection->getProperty('definitions');
    $prop->setAccessible(true);
    $definitions = $prop->getValue();

    // Make Catalog depend on Booking, and Booking depends on Services, and Services depends on Catalog
    $definitions[TenantCapability::Catalog->value]['dependencies'] = [TenantCapability::Booking];
    $definitions[TenantCapability::Booking->value]['dependencies'] = [TenantCapability::Services];
    $definitions[TenantCapability::Services->value]['dependencies'] = [TenantCapability::Catalog];

    $prop->setValue(null, $definitions);

    expect(fn () => CapabilityRegistry::resolveWithDependencies([TenantCapability::Catalog]))
        ->toThrow(CapabilityDependencyCycleException::class, 'Capability dependency cycle detected: catalog → booking → services → catalog');

    // Reset back to normal for other tests
    CapabilityRegistry::resetForTesting();
    CapabilityRegistry::boot();
});

test('capability middleware allows access if enabled and aborts/throws if disabled', function () {
    // Register a test route
    Route::get('/_test/booking-gate', function () {
        return response()->json(['success' => true]);
    })->middleware(['web', 'capability:booking']);

    // Disable booking
    $this->tenant->capabilities()->delete();

    // Attempting to access should throw CapabilityNotEnabledException (handled as 403 HTTP exception)
    $this->get('/_test/booking-gate')
        ->assertStatus(403);

    // Now enable capability
    $this->tenant->enableCapability(TenantCapability::Booking);

    // Access should now be allowed
    $this->get('/_test/booking-gate')
        ->assertOk()
        ->assertJson(['success' => true]);
});

test('PwaExperienceResolver resolves correct URLs and respects primary_experience', function () {
    $resolver = new PwaExperienceResolver;

    // Empty tenant has no experiences
    $this->tenant->capabilities()->delete();
    expect($resolver->resolve($this->tenant))->toBeEmpty();

    // Apply Salon preset (Booking and Services are enabled)
    $this->service->applyPreset($this->tenant, BusinessType::Salon);

    // primary_experience is 'book'
    expect($resolver->primaryExperience($this->tenant))->toBe(url("/app/{$this->tenant->id}/book"));

    // Resolve returns 'book' experience url
    $resolved = $resolver->resolve($this->tenant);
    expect($resolved)->toHaveKey('book');
    expect($resolved['book'])->toBe(url("/app/{$this->tenant->id}/book"));
});
