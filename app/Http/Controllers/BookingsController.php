<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingsController extends Controller
{
    /**
     * Display a listing of appointments / bookings.
     */
    public function index(): Response
    {
        $bookings = Booking::with(['service', 'customer'])
            ->orderBy('booking_date', 'desc')
            ->orderBy('booking_time', 'asc')
            ->get();

        $services = Service::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'services' => $services,
        ]);
    }

    /**
     * Update booking status.
     */
    public function updateStatus(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update($validated);

        return redirect()->route('bookings.index')->with('success', 'Appointment status updated.');
    }

    /**
     * Delete booking.
     */
    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();

        return redirect()->route('bookings.index')->with('success', 'Appointment removed.');
    }
}
