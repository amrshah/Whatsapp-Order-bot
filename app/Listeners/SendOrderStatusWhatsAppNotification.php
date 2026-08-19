<?php

namespace App\Listeners;

use App\Events\OrderStatusUpdated;
use App\Models\Tenant;
use Illuminate\Support\Facades\Log;
use Modules\Bot\Services\WhatsAppMessagingService;
use Modules\Bot\Services\WhatsAppProviderResolver;

class SendOrderStatusWhatsAppNotification
{
    /**
     * Handle the event.
     */
    public function handle(OrderStatusUpdated $event): void
    {
        try {
            $order = $event->order;
            $tenantId = $event->tenantId;

            // Only send updates if the order is a WhatsApp order
            if ($order->source !== 'whatsapp') {
                return;
            }

            // Initialize tenant context
            tenancy()->initialize($tenantId);
            $tenant = Tenant::find($tenantId);

            if (! $tenant) {
                return;
            }

            // Resolve active WhatsApp provider
            $provider = WhatsAppProviderResolver::resolve($tenant);
            $messagingService = new WhatsAppMessagingService($provider);

            $statusMessages = [
                'Preparing' => "Your order {$order->order_number} is now in the kitchen 🍳",
                'Ready' => "Your order {$order->order_number} is ready for pick-up / delivery! 🚴",
                'Delivered' => "Your order {$order->order_number} has been delivered! Enjoy your meal 🍕",
            ];

            if (isset($statusMessages[$order->status])) {
                $trackingUrl = route('pwa.track', ['tenant_slug' => $tenantId, 'order_number' => $order->order_number]);
                $body = $statusMessages[$order->status]."\n\nTrack order live:\n👉 ".$trackingUrl;

                $messagingService->sendMessage($order->customer_phone, [
                    'type' => 'text',
                    'text' => [
                        'body' => $body,
                    ],
                ]);
            }
        } catch (\Exception $e) {
            Log::warning('WhatsApp Milestone Notification Failed: '.$e->getMessage());
        }
    }
}
