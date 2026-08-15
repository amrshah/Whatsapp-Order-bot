<?php

namespace Modules\Bot\Services\Providers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Modules\Bot\Models\WhatsAppConnection;
use Modules\Bot\Services\Contracts\WhatsAppProvider;

class EvolutionApiProvider implements WhatsAppProvider
{
    protected WhatsAppConnection $connection;

    protected string $apiUrl;

    protected string $apiKey;

    public function __construct(WhatsAppConnection $connection)
    {
        $this->connection = $connection;
        $this->apiUrl = rtrim(config('services.evolution.api_url'), '/');
        $this->apiKey = config('services.evolution.api_key') ?? '';
    }

    public function sendText(string $to, string $text): bool
    {
        Log::info("Evolution [{$this->connection->instance_name}]: Sending text to {$to}");

        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
        ])->post("{$this->apiUrl}/message/sendText/{$this->connection->instance_name}", [
            'number' => $this->formatNumber($to),
            'text' => $text,
        ]);

        return $response->successful();
    }

    public function sendInteractiveButtons(string $to, string $body, array $buttons): bool
    {
        Log::info("Evolution [{$this->connection->instance_name}]: Sending buttons to {$to}");

        // Evolution button format mapping
        $formattedButtons = [];
        foreach ($buttons as $btn) {
            $formattedButtons[] = [
                'type' => 'reply',
                'reply' => [
                    'id' => $btn['id'],
                    'title' => $btn['title'],
                ],
            ];
        }

        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
        ])->post("{$this->apiUrl}/message/sendButtons/{$this->connection->instance_name}", [
            'number' => $this->formatNumber($to),
            'body' => $body,
            'buttons' => $formattedButtons,
        ]);

        if (! $response->successful()) {
            Log::error('Evolution: Failed to send buttons. Response: '.$response->body());
        }

        return $response->successful();
    }

    public function sendInteractiveList(string $to, string $body, string $buttonText, array $sections): bool
    {
        Log::info("Evolution [{$this->connection->instance_name}]: Sending list menu to {$to}");

        // Map standard sections format into Evolution list format
        $formattedSections = [];
        foreach ($sections as $sec) {
            $rows = [];
            foreach ($sec['rows'] ?? [] as $row) {
                $rows[] = [
                    'rowId' => $row['id'],
                    'title' => $row['title'],
                    'description' => $row['description'] ?? '',
                ];
            }
            $formattedSections[] = [
                'title' => $sec['title'] ?? 'Options',
                'rows' => $rows,
            ];
        }

        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
        ])->post("{$this->apiUrl}/message/sendList/{$this->connection->instance_name}", [
            'number' => $this->formatNumber($to),
            'title' => config('app.name', 'Menu'),
            'description' => $body,
            'buttonText' => $buttonText,
            'sections' => $formattedSections,
        ]);

        if (! $response->successful()) {
            Log::error('Evolution: Failed to send list. Response: '.$response->body());
        }

        return $response->successful();
    }

    public function sendLocation(string $to, float $lat, float $lng, string $name, string $address): bool
    {
        Log::info("Evolution [{$this->connection->instance_name}]: Sending location to {$to}");

        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
        ])->post("{$this->apiUrl}/message/sendLocation/{$this->connection->instance_name}", [
            'number' => $this->formatNumber($to),
            'latitude' => $lat,
            'longitude' => $lng,
            'name' => $name,
            'address' => $address,
        ]);

        return $response->successful();
    }

    /**
     * Clean phone numbers: remove '+', spaces.
     */
    protected function formatNumber(string $number): string
    {
        return preg_replace('/[^0-9]/', '', $number);
    }
}
