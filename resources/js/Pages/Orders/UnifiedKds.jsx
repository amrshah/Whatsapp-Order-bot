import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';

// Status colors based on the design
const STATUS_COLORS = {
    'Pending': 'bg-red-500', // Red for pending/needs action
    'Preparing': 'bg-orange-500', // Orange for in progress
    'Ready': 'bg-green-500', // Green for ready to go
};

// Order Type colors
const TYPE_COLORS = {
    'dinein': 'bg-cyan-500',
    'takeaway': 'bg-blue-500',
    'delivery': 'bg-yellow-500',
};

// Item Checkoff Component
const ItemCheckoff = () => {
    const [checked, setChecked] = useState(false);
    return (
        <div 
            onClick={() => setChecked(!checked)}
            className={`w-5 h-5 border-2 rounded-full cursor-pointer transition-all flex-shrink-0 ${checked ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500 hover:bg-green-50'}`}
        ></div>
    );
};

export default function UnifiedKds({ auth, orders: initialOrders, tenantId }) {
    const [orders, setOrders] = useState(initialOrders);
    const [filterType, setFilterType] = useState('All');
    
    useEffect(() => {
        setOrders(initialOrders);
    }, [initialOrders]);

    useEffect(() => {
        if (!tenantId || !window.Echo) return;

        console.log("Listening for Echo events on KDS...", tenantId);
        const channel = window.Echo.private(`tenant.${tenantId}`);
        
        channel.listen('OrderCreated', (e) => {
            console.log('OrderCreated', e);
            setOrders(prev => {
                if (prev.find(o => o.id === e.order.id)) return prev;
                return [...prev, e.order];
            });
        });

        channel.listen('OrderStatusUpdated', (e) => {
            console.log('OrderStatusUpdated', e);
            setOrders(prev => {
                if (e.order.status === 'Delivered') {
                    return prev.filter(o => o.id !== e.order.id);
                }
                return prev.map(o => o.id === e.order.id ? { ...o, status: e.order.status } : o);
            });
        });

        return () => {
            if (window.Echo) {
                channel.stopListening('OrderCreated');
                channel.stopListening('OrderStatusUpdated');
            }
        };
    }, [tenantId]);

    const handleStatusUpdate = (order, newStatus) => {
        // Optimistic UI update
        setOrders(prev => {
            if (newStatus === 'Delivered') {
                return prev.filter(o => o.id !== order.id);
            }
            return prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o);
        });

        router.patch(route('orders.status.update', order.id), { status: newStatus }, {
            preserveScroll: true,
            preserveState: true,
            onError: () => {
                // Revert on error
                setOrders(initialOrders);
            }
        });
    };

    const nextStatus = (current) => {
        if (current === 'Pending') return 'Preparing';
        if (current === 'Preparing') return 'Ready';
        if (current === 'Ready') return 'Delivered';
        return current;
    };

    const getOrderTypeClass = (type) => {
        return TYPE_COLORS[type?.toLowerCase()] || TYPE_COLORS['delivery'];
    };

    const formatTypeStrip = (order) => {
        const typeStr = order.type ? order.type.charAt(0).toUpperCase() + order.type.slice(1) : 'Delivery';
        if (order.type === 'dinein' && order.table_number) {
            return `Dine In - Table ${order.table_number}`;
        }
        if (order.type === 'delivery' && order.delivery_address) {
            return `Delivery - ${order.source === 'whatsapp' ? 'WA: ' : ''}${order.delivery_address.substring(0, 20)}...`;
        }
        return typeStr + (order.source === 'whatsapp' ? ' (WhatsApp)' : ' (POS)');
    };

    const filteredOrders = orders.filter(o => {
        if (filterType === 'All') return true;
        return o.type?.toLowerCase() === filterType.toLowerCase();
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Unified Kitchen Display System</h2>
                    <div className="flex gap-4 items-center">
                        <span className="font-bold text-gray-600">{filteredOrders.length} Pending Orders</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setFilterType('All')}
                                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${filterType === 'All' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                All ({orders.length})
                            </button>
                            <button 
                                onClick={() => setFilterType('dinein')}
                                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${filterType === 'dinein' ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'}`}
                            >
                                Dine-In ({orders.filter(o => o.type?.toLowerCase() === 'dinein').length})
                            </button>
                            <button 
                                onClick={() => setFilterType('takeaway')}
                                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${filterType === 'takeaway' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                            >
                                Takeaway ({orders.filter(o => o.type?.toLowerCase() === 'takeaway').length})
                            </button>
                            <button 
                                onClick={() => setFilterType('delivery')}
                                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${filterType === 'delivery' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                            >
                                Delivery ({orders.filter(o => o.type?.toLowerCase() === 'delivery').length})
                            </button>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Unified KDS" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* CSS Grid for KDS columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                                {/* Ticket Status Bar */}
                                <div className={`${STATUS_COLORS[order.status] || 'bg-gray-500'} text-white px-3 py-2 flex justify-between font-bold text-sm`}>
                                    <span>#{order.order_number}</span>
                                    <span>{dayjs(order.created_at).format('HH:mm')}</span>
                                </div>
                                
                                {/* Order Type Strip */}
                                <div className={`${getOrderTypeClass(order.type)} text-white px-3 py-1.5 font-semibold text-sm`}>
                                    {formatTypeStrip(order)}
                                </div>

                                {/* Items */}
                                <div className="px-3 py-2 flex-1 flex flex-col gap-2">
                                    {order.items?.map(item => (
                                        <div key={item.id} className="flex justify-between items-start border-b border-gray-100 pb-2">
                                            <div>
                                                <div className="font-bold">{item.quantity}X {item.product?.name}</div>
                                            </div>
                                            <ItemCheckoff />
                                        </div>
                                    ))}
                                </div>

                                {/* Special Notes (if any) */}
                                {order.customer_name && order.customer_name !== 'WhatsApp Customer' && order.customer_name !== 'POS Customer' && (
                                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-2 m-3 rounded text-sm text-center font-semibold">
                                        Customer: {order.customer_name}
                                    </div>
                                )}

                                {/* Ticket Footer */}
                                <div className="p-3 bg-gray-50 border-t border-gray-200 flex gap-2">
                                    <button 
                                        onClick={() => handleStatusUpdate(order, nextStatus(order.status))}
                                        className={`flex-1 text-white py-2 rounded font-bold ${STATUS_COLORS[order.status] || 'bg-blue-500'} hover:opacity-90`}
                                    >
                                        {order.status === 'Pending' ? 'Start Preparing' : 
                                         order.status === 'Preparing' ? 'Mark Ready' : 'Mark Delivered'}
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredOrders.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg shadow">
                                No active orders found. Great job!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
