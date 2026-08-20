import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, router, useForm } from '@inertiajs/react';
import { Calendar, CheckCircle2, Clock, MessageSquare, Phone, Trash2, User, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function Index({ auth, bookings = [], services = [] }) {
    const [selectedTab, setSelectedTab] = useState('all');
    const [deletingBooking, setDeletingBooking] = useState(null);

    const {
        delete: destroy,
        processing: deleteProcessing,
    } = useForm();

    const filteredBookings = bookings.filter((booking) => {
        if (selectedTab === 'all') return true;
        return booking.status === selectedTab;
    });

    const updateStatus = (bookingId, newStatus) => {
        router.patch(route('bookings.status.update', bookingId), {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (!deletingBooking) return;
        destroy(route('bookings.destroy', deletingBooking.id), {
            onSuccess: () => setDeletingBooking(null),
        });
    };

    const statusBadges = {
        pending: {
            label: 'Pending',
            className: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
        },
        confirmed: {
            label: 'Confirmed',
            className: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50',
        },
        completed: {
            label: 'Completed',
            className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
        },
        cancelled: {
            label: 'Cancelled',
            className: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
        },
    };

    const countByStatus = (status) => {
        if (status === 'all') return bookings.length;
        return bookings.filter((b) => b.status === status).length;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Appointments & Bookings
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Track, confirm, and manage client appointment requests.
                    </p>
                </div>
            }
        >
            <Head title="Appointments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Status Filter Tabs */}
                    <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
                        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setSelectedTab(tab)}
                                className={`px-4 py-2 text-xs font-semibold rounded-xl capitalize transition-all duration-150 flex items-center gap-2 ${
                                    selectedTab === tab
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700/60'
                                }`}
                            >
                                <span>{tab}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                    selectedTab === tab
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}>
                                    {countByStatus(tab)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {filteredBookings.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-2xl p-12 text-center">
                            <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                                <Calendar className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                No appointments found
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2">
                                {selectedTab === 'all'
                                    ? 'Incoming appointment bookings from your WhatsApp Bot and PWA Mini-App will appear here.'
                                    : `There are currently no ${selectedTab} appointments.`}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map((booking) => {
                                const cleanPhone = (booking.customer_phone || '').replace(/[^0-9]/g, '');
                                const badge = statusBadges[booking.status] || statusBadges.pending;

                                return (
                                    <div
                                        key={booking.id}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="space-y-3 flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    {booking.customer_name}
                                                </h3>
                                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.className}`}>
                                                    {badge.label}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                                    <span className="font-semibold">{booking.booking_date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-indigo-500" />
                                                    <span className="font-semibold">{booking.booking_time}</span>
                                                </div>
                                                {booking.service && (
                                                    <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
                                                        {booking.service.name} (${Number(booking.service.price).toFixed(2)})
                                                    </div>
                                                )}
                                            </div>

                                            {booking.notes && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                                                    <strong className="text-gray-700 dark:text-gray-300">Notes:</strong> {booking.notes}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-3 pt-1">
                                                <a
                                                    href={`https://wa.me/${cleanPhone}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/40 transition-colors"
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    Chat on WhatsApp ({booking.customer_phone})
                                                </a>
                                            </div>
                                        </div>

                                        {/* Action Controls */}
                                        <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-700">
                                            {booking.status === 'pending' && (
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(booking.id, 'confirmed')}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Confirm
                                                </button>
                                            )}

                                            {booking.status === 'confirmed' && (
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(booking.id, 'completed')}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Mark Completed
                                                </button>
                                            )}

                                            {booking.status !== 'cancelled' && (
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(booking.id, 'cancelled')}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                                                >
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    Cancel
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => setDeletingBooking(booking)}
                                                className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                                                title="Delete record"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={Boolean(deletingBooking)} onClose={() => setDeletingBooking(null)} maxWidth="sm">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        Remove Appointment Record
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Are you sure you want to delete this appointment for <strong className="text-gray-900 dark:text-white">{deletingBooking?.customer_name}</strong>?
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setDeletingBooking(null)}>
                            Cancel
                        </SecondaryButton>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleteProcessing}
                            className="inline-flex items-center px-4 py-2 bg-rose-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-500 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
