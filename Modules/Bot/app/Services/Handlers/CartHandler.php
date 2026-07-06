<?php

namespace Modules\Bot\Services\Handlers;

use Modules\Bot\Models\BotSession;
use Modules\Menu\Models\Product;

class CartHandler implements BotHandlerInterface
{
    public function handle(BotSession $session, string $message, string $type): array
    {
        if ($message === 'action_add_to_cart_1') {
            $context = $session->context ?? [];
            $productId = $context['viewing_product'] ?? null;
            
            if ($productId) {
                $cart = $context['cart'] ?? [];
                
                // Add to cart
                $found = false;
                foreach ($cart as &$item) {
                    if ($item['product_id'] === $productId) {
                        $item['quantity'] += 1;
                        $found = true;
                        break;
                    }
                }
                
                if (!$found) {
                    $cart[] = [
                        'product_id' => $productId,
                        'quantity' => 1
                    ];
                }
                
                $context['cart'] = $cart;
                $session->update([
                    'context' => $context,
                    'current_state' => 'VIEWING_CART'
                ]);
            }
        } elseif ($message === 'action_clear_cart') {
            $context = $session->context ?? [];
            $context['cart'] = [];
            $session->update([
                'context' => $context,
                'current_state' => 'VIEWING_CART'
            ]);
        }

        // Display Cart
        $cart = $session->context['cart'] ?? [];
        
        if (empty($cart)) {
            return [
                'type' => 'interactive',
                'interactive' => [
                    'type' => 'button',
                    'body' => ['text' => 'Your cart is empty.'],
                    'action' => [
                        'buttons' => [
                            ['type' => 'reply', 'reply' => ['id' => 'action_view_menu', 'title' => 'View Menu']]
                        ]
                    ]
                ]
            ];
        }

        $cartText = "*🛒 Your Cart:*\n\n";
        $total = 0;

        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $lineTotal = $product->price * $item['quantity'];
                $total += $lineTotal;
                $cartText .= "{$item['quantity']}x {$product->name} - Rs {$lineTotal}\n";
            }
        }

        $cartText .= "\n*Total: Rs {$total}*";

        return [
            'type' => 'interactive',
            'interactive' => [
                'type' => 'button',
                'body' => [
                    'text' => $cartText
                ],
                'action' => [
                    'buttons' => [
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'action_checkout',
                                'title' => 'Checkout'
                            ]
                        ],
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'action_view_menu',
                                'title' => 'Add More Items'
                            ]
                        ],
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'action_clear_cart',
                                'title' => 'Clear Cart'
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }
}
