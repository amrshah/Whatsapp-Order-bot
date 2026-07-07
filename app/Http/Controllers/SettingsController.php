<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function integrations()
    {
        // Get the current tenant via tenancy helper
        $tenant = tenant();

        return Inertia::render('Settings/Integrations', [
            'whatsapp' => [
                'access_token' => $tenant->wa_access_token ?? '',
                'phone_number_id' => $tenant->wa_phone_number_id ?? '',
                'verify_token' => $tenant->wa_verify_token ?? '',
                'app_secret' => $tenant->wa_app_secret ?? '',
            ]
        ]);
    }

    public function updateIntegrations(Request $request)
    {
        $validated = $request->validate([
            'access_token' => 'nullable|string',
            'phone_number_id' => 'nullable|string',
            'verify_token' => 'nullable|string',
            'app_secret' => 'nullable|string',
        ]);

        $tenant = tenant();
        $tenant->update([
            'wa_access_token' => $validated['access_token'],
            'wa_phone_number_id' => $validated['phone_number_id'],
            'wa_verify_token' => $validated['verify_token'],
            'wa_app_secret' => $validated['app_secret'],
        ]);

        return redirect()->route('settings.integrations')->with('success', 'Integration settings updated successfully.');
    }

    public function updateBusinessProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $tenant = tenant();
        $tenant->update(['name' => $validated['name']]);

        return redirect()->back()->with('success', 'Business profile updated successfully.');
    }
}
