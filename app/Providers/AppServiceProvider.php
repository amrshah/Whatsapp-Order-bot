<?php

namespace App\Providers;

use App\Events\OrderStatusUpdated;
use App\Listeners\SendOrderStatusWhatsAppNotification;
use App\Models\GlobalSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Opcodes\LogViewer\Facades\LogViewer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(
            OrderStatusUpdated::class,
            SendOrderStatusWhatsAppNotification::class
        );

        Vite::prefetch(concurrency: 3);

        if (class_exists(LogViewer::class)) {
            LogViewer::auth(function ($request) {
                return $request->user() && $request->user()->isPlatformAdmin();
            });
        }

        if (str_starts_with(config('app.url'), 'https://')) {
            URL::forceScheme('https');
        }

        try {
            if (Schema::hasTable('global_settings')) {
                $settings = Cache::rememberForever('global_settings', function () {
                    return GlobalSetting::pluck('value', 'key')->toArray();
                });

                if (isset($settings['app_name']) && ! empty($settings['app_name'])) {
                    config(['app.name' => $settings['app_name']]);
                }
            }
        } catch (\Exception $e) {
            // Suppress errors during initial migrations when table doesn't exist
        }
    }
}
