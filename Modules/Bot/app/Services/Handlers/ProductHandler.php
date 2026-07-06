<?php

namespace Modules\Bot\Services\Handlers;

use Modules\Bot\Models\BotSession;
use Modules\Menu\Models\Product;

class ProductHandler implements BotHandlerInterface
{
    public function handle(BotSession $session, string $message, string $type): array
    {
        if ($type !== 'interactive' || !str_starts_with($message, 'product_')) {
            return (new WelcomeHandler())->handle($session, $message, $type);
        }

        $productId = str_replace('product_', '', $message);
        $product = Product::find($productId);

        if (!$product) {
            return [
                'type' => 'text',
                'text' => ['body' => 'Product not found.']
            ];
        }

        $session->update(['current_state' => 'VIEWING_PRODUCT']);
        
        // Save the currently viewing product in context
        $context = $session->context ?? [];
        $context['viewing_product'] = $product->id;
        $session->update(['context' => $context]);

        return [
            'type' => 'interactive',
            'interactive' => [
                'type' => 'button',
                'body' => [
                    'text' => "*{$product->name}*\n\nPrice: Rs {$product->price}\n{$product->description}\n\nWould you like to add this to your cart?"
                ],
                'action' => [
                    'buttons' => [
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'action_add_to_cart_1',
                                'title' => 'Add 1 to Cart'
                            ]
                        ],
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'action_view_menu',
                                'title' => 'Back to Menu'
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }
}
