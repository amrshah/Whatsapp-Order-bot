<?php

use App\Enums\BusinessType;
use App\Models\AuditLog;
use App\Models\Booking;
use App\Models\Service;
use App\Models\Tenant;
use App\Services\AuditLogService;
use App\Services\TenantCapabilityService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Crm\Models\Customer;
use Modules\Menu\Models\Category;
use Modules\Menu\Models\Product;
use Modules\Orders\Models\Order;

uses(RefreshDatabase::class);

test('tenant isolation guarantees strict cross-tenant data separation', function () {
    // Setup Tenant Alpha
    $tenantA = Tenant::create(['id' => 'alpha-restaurant', 'name' => 'Alpha Restaurant']);
    app(TenantCapabilityService::class)->applyPreset($tenantA, BusinessType::Restaurant);

    // Setup Tenant Beta
    $tenantB = Tenant::create(['id' => 'beta-clinic', 'name' => 'Beta Clinic']);
    app(TenantCapabilityService::class)->applyPreset($tenantB, BusinessType::Clinic);

    // 1. Create Data in Tenant Alpha Context
    tenancy()->initialize($tenantA);
    $categoryA = Category::create(['name' => 'Alpha Pizzas', 'is_active' => true]);
    $productA = Product::create([
        'category_id' => $categoryA->id,
        'name' => 'Alpha Super Pizza',
        'price' => 1500,
        'is_active' => true,
    ]);
    $orderA = Order::create([
        'order_number' => 'ORD-ALPHA-01',
        'customer_name' => 'Alpha Customer',
        'customer_phone' => '+923001111111',
        'total_amount' => 1500,
        'status' => 'Delivered',
    ]);
    $customerA = Customer::create(['name' => 'Alpha VIP', 'phone' => '+923001111111']);
    AuditLogService::log('alpha_action', $orderA, ['detail' => 'secret_alpha']);

    // 2. Create Data in Tenant Beta Context
    tenancy()->initialize($tenantB);
    $serviceB = Service::create([
        'name' => 'Beta Consultation',
        'price' => 3000,
        'duration_minutes' => 45,
        'is_active' => true,
    ]);
    $bookingB = Booking::create([
        'service_id' => $serviceB->id,
        'customer_name' => 'Beta Patient',
        'customer_phone' => '+923002222222',
        'booking_date' => now()->addDay()->toDateString(),
        'booking_time' => '14:00',
        'status' => 'confirmed',
    ]);
    $customerB = Customer::create(['name' => 'Beta Patient VIP', 'phone' => '+923002222222']);
    AuditLogService::log('beta_action', $bookingB, ['detail' => 'secret_beta']);

    // 3. VERIFY TENANT ALPHA ISOLATION
    tenancy()->initialize($tenantA);

    // Alpha must only see Alpha's categories and products
    expect(Category::count())->toBe(1);
    expect(Category::first()->name)->toBe('Alpha Pizzas');
    expect(Product::count())->toBe(1);
    expect(Product::first()->name)->toBe('Alpha Super Pizza');

    // Alpha must only see Alpha's orders and customers
    expect(Order::count())->toBe(1);
    expect(Order::first()->order_number)->toBe('ORD-ALPHA-01');
    expect(Customer::count())->toBe(1);
    expect(Customer::first()->name)->toBe('Alpha VIP');

    // Alpha must not see Beta's services or bookings
    expect(Service::count())->toBe(0);
    expect(Booking::count())->toBe(0);

    // Alpha must only see Alpha's audit logs
    expect(AuditLog::count())->toBe(1);
    expect(AuditLog::first()->action)->toBe('alpha_action');

    // 4. VERIFY TENANT BETA ISOLATION
    tenancy()->initialize($tenantB);

    // Beta must only see Beta's services and bookings
    expect(Service::count())->toBe(1);
    expect(Service::first()->name)->toBe('Beta Consultation');
    expect(Booking::count())->toBe(1);
    expect(Booking::first()->customer_name)->toBe('Beta Patient');

    // Beta must only see Beta's customers
    expect(Customer::count())->toBe(1);
    expect(Customer::first()->name)->toBe('Beta Patient VIP');

    // Beta must not see Alpha's categories, products, or orders
    expect(Category::count())->toBe(0);
    expect(Product::count())->toBe(0);
    expect(Order::count())->toBe(0);

    // Beta must only see Beta's audit logs
    expect(AuditLog::count())->toBe(1);
    expect(AuditLog::first()->action)->toBe('beta_action');
});
