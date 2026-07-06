<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant
{
    use HasDomains;

    protected $fillable = [
        'id',
        'data',
        'wa_access_token',
        'wa_phone_number_id',
        'wa_verify_token',
        'wa_app_secret',
    ];

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'wa_access_token',
            'wa_phone_number_id',
            'wa_verify_token',
            'wa_app_secret',
        ];
    }
}
