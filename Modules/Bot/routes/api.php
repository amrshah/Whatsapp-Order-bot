<?php

use Illuminate\Support\Facades\Route;
use Modules\Bot\Http\Controllers\BotController;

Route::middleware(['api'])->group(function () {
    Route::post('bot/whatsapp/webhook/{tenant}', [BotController::class, 'handleWebhook']);
});
