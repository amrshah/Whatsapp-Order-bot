<?php

namespace Modules\Authentication\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the provider authentication page.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirect(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from the provider.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback(string $provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();

            $user = User::where('provider_id', $socialUser->getId())
                ->orWhere('email', $socialUser->getEmail())
                ->first();

            if (!$user) {
                // Register a new user
                $user = User::create([
                    'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                    'email' => $socialUser->getEmail(),
                    'provider_name' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    // Generate a random password for social logins just to satisfy DB constraints
                    'password' => Hash::make(Str::random(24)),
                ]);

                // Create a tenant for the new user (Restaurant Onboarding)
                $tenantName = explode(' ', $user->name)[0] . "'s Restaurant";
                
                // Use stancl/tenancy Tenant model
                $tenant = \App\Models\Tenant::create([
                    'id' => Str::slug($tenantName) . '-' . Str::random(4),
                    'name' => $tenantName,
                ]);

                // Associate user with tenant
                $user->tenant_id = $tenant->id;
                $user->save();

                // Initialize tenancy context to assign roles within tenant scope (if using tenant-aware spatie)
                // For single-db with global roles, this might just work directly.
                $user->assignRole('Owner');
            } else {
                // Update the user's provider info if they already existed via email
                $user->update([
                    'provider_name' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                ]);
            }

            Auth::login($user, true);

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Authentication failed. Please try again.');
        }
    }
}
