import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { UtensilsCrossed, Monitor, Users, DollarSign, ShoppingCart, Package, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function Dashboard({ kpis }) {
    const { appName, auth, tenant } = usePage().props;
    const name = appName || 'Bracemen Bot';
    const user = auth.user;

    const hasCap = (cap) => tenant?.capabilities ? tenant.capabilities.includes(cap) : true;
    const isOrdering = hasCap('ordering');
    const isCatalog = hasCap('catalog');
    const isKds = hasCap('kds');
    const isBooking = hasCap('booking') || hasCap('services');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard Overview
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Welcome Banner */}
                    <div className="overflow-hidden bg-indigo-600 shadow-sm sm:rounded-2xl mb-8">
                        <div className="p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Active Workspace</span>
                                </div>
                                <h3 className="text-2xl font-bold">Welcome to {name}!</h3>
                                <p className="mt-2 text-indigo-100 text-sm max-w-xl">
                                    Your intelligent WhatsApp assistant is running.
                                    {user && user.tenant_id ? " Share your WhatsApp number with customers to start receiving interactions automatically." : " Configure global settings or manage tenants from the sidebar."}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {isCatalog && (
                                    <Link 
                                        href={route('menu.categories.index')} 
                                        className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition shadow flex items-center gap-1.5"
                                    >
                                        <Package className="w-3.5 h-3.5" /> Manage Menu
                                    </Link>
                                )}
                                {isKds && (
                                    <a 
                                        href={route('orders.kds-unified')}
                                        target="_blank"
                                        className="bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-400 border border-indigo-400 transition shadow flex items-center gap-1.5"
                                    >
                                        <Monitor className="w-3.5 h-3.5" /> Open KDS
                                    </a>
                                )}
                                <Link 
                                    href={route('crm.index')}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                                >
                                    <Users className="w-3.5 h-3.5" /> View CRM & Inquiries
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* KPI Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        
                        {/* Saved Commission Card (Ordering only) */}
                        {isOrdering && (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border-l-4 border-emerald-500">
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl p-3">
                                            <DollarSign className="h-6 w-6" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aggregator Commission Saved</dt>
                                                <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Rs. {kpis?.savedCommission?.toLocaleString() || 0}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Total Orders Card (Ordering only) */}
                        {isOrdering && (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border-l-4 border-indigo-500">
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl p-3">
                                            <ShoppingCart className="h-6 w-6" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Orders Processed</dt>
                                                <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{kpis?.totalOrders || 0}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Active Items Card (Catalog only) */}
                        {isCatalog && (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border-l-4 border-amber-500">
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl p-3">
                                            <Package className="h-6 w-6" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active Catalog Items</dt>
                                                <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{kpis?.activeItems || 0}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CRM Inquiries Card (Universal) */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border-l-4 border-sky-500">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-xl p-3">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {isBooking ? 'Patient / Client Contacts' : 'Customer Contacts'}
                                            </dt>
                                            <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{kpis?.totalCustomers || 0}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
