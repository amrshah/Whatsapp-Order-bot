<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    /**
     * Display a listing of the services.
     */
    public function index(): Response
    {
        $services = Service::orderBy('name')->get();

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }

    /**
     * Store a newly created service.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:5|max:480',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        Service::create($validated);

        return redirect()->route('services.index')->with('success', 'Service created successfully.');
    }

    /**
     * Update the specified service.
     */
    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:5|max:480',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $service->update($validated);

        return redirect()->route('services.index')->with('success', 'Service updated successfully.');
    }

    /**
     * Remove the specified service.
     */
    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
}
