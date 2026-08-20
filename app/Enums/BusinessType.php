<?php

namespace App\Enums;

enum BusinessType: string
{
    case Restaurant = 'restaurant';
    case Clinic = 'clinic';
    case Salon = 'salon';
    case LawFirm = 'law_firm';
    case Workshop = 'workshop';
    case Retail = 'retail';

    /**
     * Returns the default capabilities assigned when this business type preset is selected.
     *
     * @return TenantCapability[]
     */
    public function defaultCapabilities(): array
    {
        return match ($this) {
            self::Restaurant => [
                TenantCapability::Catalog,
                TenantCapability::Ordering,
                TenantCapability::Kds,
                TenantCapability::Delivery,
            ],
            self::Clinic => [
                TenantCapability::Services,
                TenantCapability::Booking,
                TenantCapability::Staff,
                TenantCapability::Payments,
            ],
            self::Salon => [
                TenantCapability::Services,
                TenantCapability::Booking,
                TenantCapability::Staff,
                TenantCapability::Payments,
            ],
            self::LawFirm => [
                TenantCapability::Services,
                TenantCapability::Booking,
                TenantCapability::Documents,
            ],
            self::Workshop => [
                TenantCapability::Services,
                TenantCapability::Booking,
            ],
            self::Retail => [
                TenantCapability::Catalog,
                TenantCapability::Ordering,
                TenantCapability::Inventory,
                TenantCapability::Delivery,
            ],
        };
    }

    /**
     * Returns the default primary experience key for this business type.
     */
    public function defaultPrimaryExperience(): string
    {
        return match ($this) {
            self::Restaurant, self::Retail => 'order',
            self::Clinic, self::Salon, self::LawFirm, self::Workshop => 'book',
        };
    }
}
