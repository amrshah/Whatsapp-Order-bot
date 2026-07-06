<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalTenants = \App\Models\Tenant::count();
        $totalUsers = \App\Models\User::count();

        return \Inertia\Inertia::render('Admin/Dashboard', [
            'kpis' => [
                'totalTenants' => $totalTenants,
                'totalUsers' => $totalUsers,
            ],
        ]);
    }
}
