import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ kpis }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Restaurant Overview
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Welcome Banner */}
                    <div className="overflow-hidden bg-indigo-600 shadow-sm sm:rounded-lg mb-8">
                        <div className="p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h3 className="text-2xl font-bold">Welcome to Hotel wala Bot!</h3>
                                <p className="mt-2 text-indigo-100">Your zero-latency restaurant OS is active and waiting for orders.</p>
                            </div>
                            <div className="flex gap-4">
                                <Link 
                                    href={route('menu.categories.index')} 
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition shadow"
                                >
                                    Manage Menu
                                </Link>
                                <a 
                                    href={route('orders.index')}
                                    target="_blank"
                                    className="bg-indigo-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-400 border border-indigo-400 transition shadow"
                                >
                                    Open KDS
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* KPI Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        
                        {/* Saved Commission Card */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border-l-4 border-green-500">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Aggregator Commission Saved</dt>
                                            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">Rs. {kpis?.savedCommission?.toLocaleString() || 0}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders Card */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border-l-4 border-indigo-500">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders Processed</dt>
                                            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{kpis?.totalOrders || 0}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active Items Card */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border-l-4 border-amber-500">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                                        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Active Menu Items</dt>
                                            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{kpis?.activeItems || 0}</dd>
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
