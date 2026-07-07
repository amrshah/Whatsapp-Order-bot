<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

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
        Vite::prefetch(concurrency: 3);

        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('global_settings')) {
                $settings = \Illuminate\Support\Facades\Cache::rememberForever('global_settings', function () {
                    return \App\Models\GlobalSetting::pluck('value', 'key')->toArray();
                });

                if (isset($settings['app_name']) && !empty($settings['app_name'])) {
                    config(['app.name' => $settings['app_name']]);
                }
            }
        } catch (\Exception $e) {
            // Suppress errors during initial migrations when table doesn't exist
        }
    }
}
