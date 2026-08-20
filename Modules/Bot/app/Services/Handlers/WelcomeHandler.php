<?php

namespace Modules\Bot\Services\Handlers;

use App\Capability\PwaExperienceResolver;
use Modules\Bot\Models\BotSession;
use Modules\Bot\Services\CustomerPwaTokenService;
use Modules\Crm\Models\Customer;
use Modules\Orders\Models\Order;

class WelcomeHandler implements BotHandlerInterface
{
    public function handle(BotSession $session, string $message, string $type): array
    {
        $session->update(['current_state' => 'START']);
        $tenantId = tenant('id');

        // Retrieve customer from CRM (created at gateway entry)
        $customer = Customer::where('phone', $session->phone_number)->first();
        $customerId = $customer ? $customer->id : 0;

        $tenant = tenant();

        // Generate signed token
        $token = CustomerPwaTokenService::generateToken($customerId, $tenant->id);

        // Resolve primary experience URL
        $resolver = app(PwaExperienceResolver::class);
        $baseUrl = $resolver->primaryExperience($tenant);
        $pwaUrl = $baseUrl.(str_contains($baseUrl, '?') ? '&' : '?').'auth='.urlencode($token);

        $appName = $tenant->name ?: config('app.name', 'Ormeasy');

        if (str_contains($baseUrl, '/book')) {
            $text = "Welcome to {$appName}!\n\nTap the link below to view our services and book an appointment:\n{$pwaUrl}";
        } else {
            $text = "Welcome to {$appName}!\n\nTap the link below to browse our menu, customize items, and place your order:\n{$pwaUrl}";
        }

        return [
            'type' => 'text',
            'text' => [
                'body' => $text,
            ],
        ];
    }

    private function handleRepeatOrder(BotSession $session): array
    {
        $lastOrder = Order::where('customer_phone', $session->phone_number)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->first();

        if (! $lastOrder) {
            return $this->handle($session, '', 'text');
        }

        $cart = [];
        foreach ($lastOrder->items as $item) {
            if ($item->product_id) {
                $cart[] = [
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                ];
            }
        }

        $context = $session->context ?? [];
        $context['cart'] = $cart;
        $session->update([
            'context' => $context,
            'current_state' => 'VIEWING_CART',
        ]);

        return (new CartHandler)->handle($session, 'action_view_cart', 'interactive');
    }
}
