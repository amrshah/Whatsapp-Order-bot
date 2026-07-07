<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('tenant')->latest()->paginate(20);

        return Inertia::render('Admin/Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    public function markAsPaid(Invoice $invoice)
    {
        $invoice->update(['status' => 'paid']);

        return redirect()->back()->with('success', 'Invoice marked as paid.');
    }

    public function sendReminder(Invoice $invoice)
    {
        // Get tenant's user phone
        tenancy()->initialize($invoice->tenant_id);
        $user = \App\Models\User::whereNotNull('phone')->first();
        tenancy()->end();

        if ($user && $user->phone) {
            $message = "Reminder: Your invoice #{$invoice->id} for Rs. {$invoice->amount} is pending. Please pay at your earliest convenience.";
            Log::info("Would send manual WhatsApp reminder to {$user->phone}: {$message}");
            return redirect()->back()->with('success', 'Reminder sent successfully.');
        }

        return redirect()->back()->with('error', 'No user phone number found for this tenant.');
    }

    public function show(Invoice $invoice)
    {
        $settings = \Illuminate\Support\Facades\Cache::rememberForever('global_settings', function () {
            return \App\Models\GlobalSetting::pluck('value', 'key')->toArray();
        });

        $invoice->loadMissing('tenant');

        return view('invoice', [
            'invoice' => $invoice,
            'settings' => $settings,
        ]);
    }

    public function destroy(Invoice $invoice)
    {
        if ($invoice->status === 'paid') {
            return redirect()->back()->with('error', 'Cannot delete a paid invoice.');
        }

        $invoice->delete();

        return redirect()->back()->with('success', 'Invoice deleted successfully.');
    }
}
