import React, { useState, useEffect } from 'react';
import PwaLayout from '@/Layouts/PwaLayout';
import { Head, Link } from '@inertiajs/react';

export default function OrderTracking({ tenant, order }) {
    const [orderStatus, setOrderStatus] = useState(order.status);

    useEffect(() => {
        if (!window.Echo) {
            console.warn('Laravel Echo is not initialized.');
            return;
        }

        const channelName = `orders.${order.order_number}`;
        console.log(`Subscribing to public channel: ${channelName}`);

        const channel = window.Echo.channel(channelName);
        channel.listen('OrderStatusUpdated', (event) => {
            console.log('Order status update received:', event);
            if (event.order && event.order.status) {
                setOrderStatus(event.order.status);
            }
        });

        return () => {
            console.log(`Unsubscribing from channel: ${channelName}`);
            window.Echo.leave(channelName);
        };
    }, [order.order_number]);

    // Status map
    const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered'];
    const currentStepIndex = statuses.indexOf(orderStatus);

    const stepLabels = {
        Pending: 'Received',
        Preparing: 'Preparing 🍳',
        Ready: 'On the Way 🚴',
        Delivered: 'Delivered 🎉',
    };

    return (
        <PwaLayout tenantName={tenant.name}>
            <Head title={`Track Order ${order.order_number}`} />

            <div className="flex-1 bg-white p-5 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                    {/* Top Order Meta */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center space-y-1">
                        <span className="text-[10px] uppercase font-black text-gray-400">Order Reference</span>
                        <h2 className="text-lg font-black text-gray-900">{order.order_number}</h2>
                        <p className="text-xs text-gray-500">Estimated completion in 30-40 mins</p>
                    </div>

                    {/* Progress Track Stepper */}
                    <div className="relative pl-8 space-y-8 before:absolute before:inset-y-1 before:left-[11px] before:w-[2px] before:bg-gray-100">
                        {statuses.map((status, index) => {
                            const isCompleted = index < currentStepIndex;
                            const isActive = index === currentStepIndex;

                            return (
                                <div key={status} className="relative flex items-start gap-4">
                                    {/* Indicator */}
                                    <div
                                        className={`absolute -left-[27px] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-colors ${
                                            isCompleted
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : isActive
                                                ? 'bg-red-500 border-red-500 text-white animate-pulse'
                                                : 'bg-white border-gray-200 text-gray-400'
                                        }`}
                                    >
                                        {isCompleted ? '✓' : index + 1}
                                    </div>

                                    {/* Label details */}
                                    <div>
                                        <h3
                                            className={`text-sm font-bold ${
                                                isActive ? 'text-gray-900 font-extrabold' : 'text-gray-500'
                                            }`}
                                        >
                                            {stepLabels[status]}
                                        </h3>
                                        {isActive && (
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Our team is actively working on your order.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Back to menu button */}
                <div className="space-y-4">
                    <div className="border-t border-gray-100 pt-4 flex justify-between text-xs font-bold text-gray-500">
                        <span>Total Price</span>
                        <span className="text-red-600 font-black">Rs. {order.total_amount}</span>
                    </div>

                    <Link
                        href={route('pwa.menu', { tenant_slug: tenant.id })}
                        className="w-full bg-gray-100 hover:bg-gray-250 text-gray-800 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                        🏠 Return to Menu
                    </Link>
                </div>
            </div>
        </PwaLayout>
    );
}
