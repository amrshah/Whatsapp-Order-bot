import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Calendar, Clock, MessageSquare, CheckCircle, Info, Sparkles, MapPin, Phone } from 'lucide-react';

export default function MiniApp({ tenant, customer, settings, currentExperience, capabilities = [], previewMode = false }) {
    const [bookingSubmitted, setBookingSubmitted] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        name: customer?.name || '',
        phone: customer?.phone || '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
    });

    const isBooking = currentExperience === 'book' || capabilities.includes('booking');
    const branding = settings?.branding || {};
    const primaryColor = branding.primary_color || '#4f46e5';

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setBookingSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
            <Head title={`${tenant.name} - Mini App`} />

            {/* Top Branding Banner */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-30">
                <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                            {tenant.name}
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {isBooking ? 'Online Booking & Appointments' : 'Digital Hub'}
                        </p>
                    </div>

                    {previewMode && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                            Live Preview
                        </span>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-xl w-full mx-auto p-4 space-y-6">
                {/* Hero Card */}
                <div 
                    className="rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, #312e81)` }}
                >
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            {isBooking ? 'Fast & Easy Booking' : 'Welcome'}
                        </span>
                        <h2 className="text-2xl font-black mb-1">{tenant.name}</h2>
                        <p className="text-xs text-white/80 leading-relaxed max-w-md">
                            {branding.description || 'Schedule your appointment or connect with our team directly.'}
                        </p>
                    </div>
                </div>

                {/* Experience Panels */}
                {isBooking ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-5">
                        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="font-bold text-base text-gray-900 dark:text-white">Request an Appointment</h3>
                        </div>

                        {bookingSubmitted ? (
                            <div className="text-center py-8 space-y-3">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-7 h-7" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Request Received!</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                    We have received your appointment request. Our team will confirm your slot via WhatsApp shortly.
                                </p>
                                <button
                                    onClick={() => setBookingSubmitted(false)}
                                    className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-xs font-semibold rounded-lg transition"
                                >
                                    Book Another Slot
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={bookingForm.name}
                                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                        placeholder="Full Name"
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={bookingForm.phone}
                                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                        placeholder="WhatsApp Number"
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Preferred Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={bookingForm.preferredDate}
                                            onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                                            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
                                        <input
                                            type="time"
                                            required
                                            value={bookingForm.preferredTime}
                                            onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                                            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Service / Notes (Optional)</label>
                                    <textarea
                                        rows={2}
                                        value={bookingForm.notes}
                                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                                        placeholder="Specific service requested, concerns, or notes..."
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 text-white font-bold rounded-xl shadow-md transition text-sm flex items-center justify-center gap-2"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <Calendar className="w-4 h-4" /> Confirm Appointment Request
                                </button>
                            </form>
                        )}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-4 text-center">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto">
                            <Info className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">Direct Assistance & Contact</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            Our team is available to assist you directly via WhatsApp. Send us a message for quotes, inquiries, and immediate support.
                        </p>
                        
                        <div className="pt-2">
                            <a
                                href={`https://wa.me/?text=Hello%20${encodeURIComponent(tenant.name)}%2C%20I%20would%20like%20more%20information.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                            >
                                <MessageSquare className="w-4 h-4" /> Message on WhatsApp
                            </a>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-gray-400">
                Powered by Ormeasy
            </footer>
        </div>
    );
}
