<?php

use Illuminate\Support\Facades\Route;
use Modules\Bot\Http\Controllers\BotController;

Route::middleware(['api'])->group(function () {
    Route::get('bot/whatsapp/webhook', [BotController::class, 'verifyWebhook']);
    Route::post('bot/whatsapp/webhook', [BotController::class, 'handleWebhook']);
});
