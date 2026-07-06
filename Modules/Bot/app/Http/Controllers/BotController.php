<?php

namespace Modules\Bot\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Orders\Models\Order;
use Modules\Menu\Models\Product;
use Stancl\Tenancy\Features\TenantConfig;
use App\Models\Tenant;

class BotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('bot::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('bot::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('bot::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('bot::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}

    public function handleWebhook(Request $request, $tenantId)
    {
        $tenant = \App\Models\Tenant::find($tenantId);
        if (!$tenant) {
            return response()->json([
                'type' => 'text',
                'text' => ['body' => "Error: Restaurant not found or inactive."]
            ], 404);
        }

        tenancy()->initialize($tenant);

        // Dummy parser to extract message text and sender phone from standard or Meta payload
        $payload = $request->all();
        
        $fromNumber = null;
        $messageBody = '';
        $messageType = 'text';

        // Parse simplified request or Meta API request
        if (isset($payload['Body'])) {
            $fromNumber = $payload['From'] ?? '+1234567890';
            $messageBody = trim($payload['Body']);
        } elseif (isset($payload['entry'][0]['changes'][0]['value']['messages'][0])) {
            $msg = $payload['entry'][0]['changes'][0]['value']['messages'][0];
            $fromNumber = $msg['from'];
            if ($msg['type'] === 'text') {
                $messageBody = $msg['text']['body'];
            } elseif ($msg['type'] === 'interactive') {
                $messageType = 'interactive';
                if ($msg['interactive']['type'] === 'button_reply') {
                    $messageBody = $msg['interactive']['button_reply']['id'];
                } elseif ($msg['interactive']['type'] === 'list_reply') {
                    $messageBody = $msg['interactive']['list_reply']['id'];
                }
            }
        } else {
            // For simulator
            $fromNumber = $request->phone ?? '+1234567890';
            $messageBody = $request->message ?? '';
            $messageType = $request->type ?? 'text'; // Can be 'interactive'
        }

        // 1. Get or Create Session
        $session = \Modules\Bot\Models\BotSession::firstOrCreate(
            ['phone_number' => $fromNumber, 'tenant_id' => tenant('id')],
            ['current_state' => 'START', 'expires_at' => now()->addHours(2)]
        );

        if ($session->isExpired()) {
            $session->update(['current_state' => 'START', 'context' => null, 'expires_at' => now()->addHours(2)]);
        } else {
            $session->update(['expires_at' => now()->addHours(2)]);
        }

        // 2. Route to Handler based on State
        $state = $session->current_state;
        
        // Special case: if user types "hi" or "menu", reset state
        if ($messageType === 'text' && in_array(strtolower($messageBody), ['hi', 'hello', 'menu', 'start'])) {
            $state = 'START';
        }

        $handler = match ($state) {
            'START' => new \Modules\Bot\Services\Handlers\WelcomeHandler(),
            'CATEGORY_SELECT' => new \Modules\Bot\Services\Handlers\CategoryHandler(),
            'PRODUCT_SELECT' => new \Modules\Bot\Services\Handlers\ProductHandler(),
            'VIEWING_PRODUCT' => new \Modules\Bot\Services\Handlers\CartHandler(),
            'VIEWING_CART' => new \Modules\Bot\Services\Handlers\CheckoutHandler(),
            'CHECKOUT_TYPE' => new \Modules\Bot\Services\Handlers\AddressHandler(),
            'AWAITING_ADDRESS' => new \Modules\Bot\Services\Handlers\AddressHandler(),
            'CONFIRMATION' => new \Modules\Bot\Services\Handlers\ConfirmationHandler(),
            default => new \Modules\Bot\Services\Handlers\WelcomeHandler()
        };

        // If they click 'action_view_menu' at any point
        if ($messageType === 'interactive' && $messageBody === 'action_view_menu') {
            $handler = new \Modules\Bot\Services\Handlers\MenuHandler();
        }
        
        // If they click 'action_checkout' at any point
        if ($messageType === 'interactive' && $messageBody === 'action_checkout') {
            $handler = new \Modules\Bot\Services\Handlers\CheckoutHandler();
        }

        $responsePayload = $handler->handle($session, $messageBody, $messageType);

        return response()->json($responsePayload);
    }
}
