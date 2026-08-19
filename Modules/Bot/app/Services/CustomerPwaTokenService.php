<?php

namespace Modules\Bot\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;

class CustomerPwaTokenService
{
    /**
     * Generate an opaque URL-safe token valid for 15 minutes.
     */
    public static function generateToken(int $customerId, string $tenantId): string
    {
        $payload = [
            'customer_id' => $customerId,
            'tenant_id' => $tenantId,
            'expires_at' => now()->addMinutes(15)->timestamp,
        ];

        // Encrypt the payload and convert to hex to make it URL-safe
        return bin2hex(Crypt::encrypt(json_encode($payload)));
    }

    /**
     * Validate and decrypt an opaque token.
     * Returns the decrypted payload array or null if invalid/expired.
     */
    public static function validateToken(string $token): ?array
    {
        try {
            if (empty($token)) {
                return null;
            }

            $binaryData = @hex2bin($token);
            if ($binaryData === false) {
                return null;
            }

            $decrypted = Crypt::decrypt($binaryData);
            $payload = json_decode($decrypted, true);

            if (! is_array($payload)) {
                return null;
            }

            // Verify expiration
            if (! isset($payload['expires_at']) || $payload['expires_at'] < now()->timestamp) {
                Log::warning('PWA Token Validation: Token has expired.');

                return null;
            }

            return $payload;
        } catch (\Exception $e) {
            Log::warning('PWA Token Validation Error: '.$e->getMessage());

            return null;
        }
    }
}
