<?php

namespace Modules\Bot\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SimulatorController extends Controller
{
    public function index(Request $request)
    {
        $tenants = \App\Models\Tenant::all(['id', 'id as name']); // Assuming name doesn't exist, fallback to id for now
        
        return Inertia::render('Bot/Simulator', [
            'tenant' => $request->query('tenant'),
            'tenants' => $tenants,
        ]);
    }
}
