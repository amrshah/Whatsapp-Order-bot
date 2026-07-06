<?php

namespace Modules\Bot\Services\Handlers;

use Modules\Bot\Models\BotSession;

class AddressHandler implements BotHandlerInterface
{
    public function handle(BotSession $session, string $message, string $type): array
    {
        $context = $session->context ?? [];
        
        // If we are just arriving here from CHECKOUT_TYPE
        if ($session->current_state === 'CHECKOUT_TYPE') {
            if ($type !== 'interactive' || !str_starts_with($message, 'order_type_')) {
                return [
                    'type' => 'text',
                    'text' => ['body' => 'Please select an order type using the buttons.']
                ];
            }
            
            $orderType = str_replace('order_type_', '', $message); // delivery, takeaway, dinein
            $context['order_type'] = ucfirst($orderType);
            
            $session->update([
                'current_state' => 'AWAITING_ADDRESS',
                'context' => $context
            ]);

            if ($orderType === 'dinein') {
                $prompt = "Please enter your Table Number:";
            } elseif ($orderType === 'delivery') {
                $prompt = "Please enter your full Delivery Address:";
            } else {
                // Takeaway
                return (new ConfirmationHandler())->handle($session, 'ready_to_confirm', 'system');
            }

            return [
                'type' => 'text',
                'text' => ['body' => $prompt]
            ];
        }

        // If we are receiving the address/table text
        if ($session->current_state === 'AWAITING_ADDRESS') {
            if ($type !== 'text') {
                return [
                    'type' => 'text',
                    'text' => ['body' => 'Please type your address or table number.']
                ];
            }

            if ($context['order_type'] === 'Dinein') {
                $context['table_number'] = $message;
            } else {
                $context['address'] = $message;
            }

            $session->update([
                'context' => $context
            ]);

            return (new ConfirmationHandler())->handle($session, 'ready_to_confirm', 'system');
        }

        return (new WelcomeHandler())->handle($session, $message, $type);
    }
}
