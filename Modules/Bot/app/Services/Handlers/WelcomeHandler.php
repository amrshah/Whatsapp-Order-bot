<?php

namespace Modules\Bot\Services\Handlers;

use Modules\Bot\Models\BotSession;

class WelcomeHandler implements BotHandlerInterface
{
    public function handle(BotSession $session, string $message, string $type): array
    {
        $session->update(['current_state' => 'START']);

        return [
            'type' => 'interactive',
            'interactive' => [
                'type' => 'button',
                'body' => [
                    'text' => "Welcome to Hotel Wala Bot! 👋\nHow can we help you today?"
                ],
                'action' => [
                    'buttons' => [
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'action_view_menu',
                                'title' => 'View Menu'
                            ]
                        ],
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'action_offers',
                                'title' => 'View Offers'
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }
}
