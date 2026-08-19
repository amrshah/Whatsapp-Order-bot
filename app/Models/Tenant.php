<?php

namespace App\Models;

use App\Services\TenantSettingsService;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant
{
    use HasDomains;

    protected $fillable = [
        'id',
        'name',
        'is_active',
        'data',
        'wa_access_token',
        'wa_phone_number_id',
        'wa_verify_token',
        'wa_app_secret',
        'billing_model',
        'billing_rate',
        'billing_frequency',
        'last_billed_at',
    ];

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'is_active',
            'wa_access_token',
            'wa_phone_number_id',
            'wa_business_account_id',
            'billing_model',
            'billing_rate',
            'billing_frequency',
            'last_billed_at',
            'wa_verify_token',
            'wa_app_secret',
        ];
    }

    public function settings(string $status = 'published')
    {
        return (new TenantSettingsService)->getSettings($this->id, $status);
    }
}
