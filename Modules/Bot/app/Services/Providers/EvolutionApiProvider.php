<?php

namespace Modules\Bot\Services\Providers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Modules\Bot\Models\BotSession;
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
        Log::info("Evolution [{$this->connection->instance_name}]: Sending interactive buttons to {$to}");

        $cleanNumber = $this->formatNumber($to);
        $formattedButtons = [];
        $optionsMap = [];
        $index = 1;

        foreach ($buttons as $btn) {
            $displayText = $btn['title'];
            $btnId = $btn['id'];
            $formattedButtons[] = [
                'type' => 'reply',
                'displayText' => $displayText,
                'id' => $btnId,
            ];
            $optionsMap[(string) $index] = $btnId;
            $index++;
        }

        // Save options map to session context
        $session = BotSession::where('phone_number', $cleanNumber)
            ->where('tenant_id', $this->connection->tenant_id)
            ->first();
        if ($session) {
            $context = $session->context ?? [];
            $context['options_map'] = $optionsMap;
            $session->update(['context' => $context]);
        }

        // Try native Evolution API sendButtons endpoint
        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
        ])->post("{$this->apiUrl}/message/sendButtons/{$this->connection->instance_name}", [
            'number' => $cleanNumber,
            'title' => $this->connection->tenant->name ?? 'Order Bot',
            'description' => $body,
            'buttons' => $formattedButtons,
        ]);

        if ($response->successful()) {
            return true;
        }

        Log::warning("Evolution API sendButtons failed for {$to}, falling back to sendText: ".$response->body());

        // Fallback: send as text with numbered options
        $text = $body."\n\n";
        $i = 1;
        foreach ($buttons as $btn) {
            $text .= "{$i}. ".$btn['title']."\n";
            $i++;
        }

        return $this->sendText($to, trim($text));
    }

    public function sendInteractiveList(string $to, string $body, string $buttonText, array $sections): bool
    {
        Log::info("Evolution [{$this->connection->instance_name}]: Sending interactive list to {$to}");

        $cleanNumber = $this->formatNumber($to);
        $optionsMap = [];
        $index = 1;

        $formattedSections = [];
        foreach ($sections as $sec) {
            $rows = [];
            foreach ($sec['rows'] ?? [] as $row) {
                $rows[] = [
                    'title' => substr($row['title'], 0, 24),
                    'description' => isset($row['description']) ? substr($row['description'], 0, 72) : '',
                    'rowId' => $row['id'],
                ];
                $optionsMap[(string) $index] = $row['id'];
                $index++;
            }
            $formattedSections[] = [
                'title' => substr($sec['title'] ?? 'Options', 0, 24),
                'rows' => $rows,
            ];
        }

        // Save options map to session context
        $session = BotSession::where('phone_number', $cleanNumber)
            ->where('tenant_id', $this->connection->tenant_id)
            ->first();
        if ($session) {
            $context = $session->context ?? [];
            $context['options_map'] = $optionsMap;
            $session->update(['context' => $context]);
        }

        // Try native Evolution API sendList endpoint
        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
        ])->post("{$this->apiUrl}/message/sendList/{$this->connection->instance_name}", [
            'number' => $cleanNumber,
            'title' => $this->connection->tenant->name ?? 'Menu',
            'description' => $body,
            'buttonText' => substr($buttonText, 0, 20),
            'sections' => $formattedSections,
        ]);

        if ($response->successful()) {
            return true;
        }

        Log::warning("Evolution API sendList failed for {$to}, falling back to sendText: ".$response->body());

        // Fallback: send as text with numbered options
        $text = $body."\n\n";
        $i = 1;
        foreach ($sections as $sec) {
            if (! empty($sec['title'])) {
                $text .= '=== '.$sec['title']." ===\n";
            }
            foreach ($sec['rows'] ?? [] as $row) {
                $text .= "{$i}. ".$row['title'];
                if (! empty($row['description'])) {
                    $text .= ' - '.$row['description'];
                }
                $text .= "\n";
                $i++;
            }
            $text .= "\n";
        }

        return $this->sendText($to, trim($text));
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
