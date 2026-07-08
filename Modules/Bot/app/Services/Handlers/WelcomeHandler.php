<?php

namespace Modules\Bot\Services\Handlers;

use Modules\Bot\Models\BotSession;

class WelcomeHandler implements BotHandlerInterface
{
    public function handle(BotSession $session, string $message, string $type): array
    {
        // Check if user clicked Repeat Last Order
        if ($type === 'interactive' && $message === 'action_repeat_last_order') {
            return $this->handleRepeatOrder($session);
        }

        $session->update(['current_state' => 'START']);
        $appName = config('app.name', 'Bracemen Bot');

        $lastOrder = \Modules\Orders\Models\Order::where('customer_phone', $session->phone_number)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->first();

        $text = "Welcome to {$appName}! 👋\nHow can we help you today?";
        $buttons = [
            ['type' => 'reply', 'reply' => ['id' => 'action_view_menu', 'title' => '📖 Browse Menu']],
            ['type' => 'reply', 'reply' => ['id' => 'action_offers', 'title' => '🔥 Today\'s Deals']],
        ];

        if ($lastOrder && $lastOrder->items->count() > 0) {
            $customerName = $lastOrder->customer_name ?? 'there';
            $text = "🍕 Welcome back, {$customerName}!\n\nYour last order:\n";
            foreach ($lastOrder->items as $item) {
                $productName = $item->product ? $item->product->name : 'Item';
                $text .= "✓ {$item->quantity}x {$productName}\n";
            }
            $text .= "\nRs. {$lastOrder->total_amount}";
            
            // Prepend Repeat Order button
            array_unshift($buttons, ['type' => 'reply', 'reply' => ['id' => 'action_repeat_last_order', 'title' => '🍔 Repeat Order']]);
        }

        // WhatsApp allows max 3 buttons.
        if (count($buttons) < 3) {
            $cart = $session->context['cart'] ?? [];
            if (!empty($cart)) {
                $buttons[] = ['type' => 'reply', 'reply' => ['id' => 'action_view_cart', 'title' => '🛒 View Cart']];
            }
        }

        return [
            'type' => 'interactive',
            'interactive' => [
                'type' => 'button',
                'body' => ['text' => $text],
                'action' => ['buttons' => array_slice($buttons, 0, 3)]
            ]
        ];
    }

    private function handleRepeatOrder(BotSession $session): array
    {
        $lastOrder = \Modules\Orders\Models\Order::where('customer_phone', $session->phone_number)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$lastOrder) {
            return $this->handle($session, '', 'text');
        }

        $cart = [];
        foreach ($lastOrder->items as $item) {
            if ($item->product_id) {
                $cart[] = [
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity
                ];
            }
        }

        $context = $session->context ?? [];
        $context['cart'] = $cart;
        $session->update([
            'context' => $context,
            'current_state' => 'VIEWING_CART'
        ]);

        return (new CartHandler())->handle($session, 'action_view_cart', 'interactive');
    }
}
