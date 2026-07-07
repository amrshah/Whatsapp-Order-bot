import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ tenant, metrics }) {
    const { flash } = usePage().props;
    const [rate, setRate] = useState(tenant.billing_rate || 0);

    return (
        <AdminLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tenant Details: {tenant.name || tenant.id}</h2>}
        >
            <Head title={`Tenant: ${tenant.name || tenant.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash?.success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {flash.error}
                        </div>
                    )}

                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <Link
                                href={route('admin.tenants.edit', tenant.id)}
                                className="border-indigo-500 text-indigo-600 dark:text-indigo-400 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                aria-current="page"
                            >
                                Details & Billing
                            </Link>
                            <Link
                                href={route('admin.tenants.orders', tenant.id)}
                                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            >
                                Orders Ledger
                            </Link>
                        </nav>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Tenant Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Tenant Name</p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{tenant.name || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Tenant ID</p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{tenant.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Domain</p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{tenant.domains.length > 0 ? tenant.domains[0].domain : 'No domain configured'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Created At</p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(tenant.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Tenant Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-md">
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Total Orders Processed</p>
                                <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-200">{metrics.total_orders}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Active Products</p>
                                <p className="text-3xl font-bold text-green-900 dark:text-green-200">{metrics.active_products}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Billing Configuration</h3>
                        <form onSubmit={(e) => { e.preventDefault(); router.post(route('admin.tenants.billing.update', tenant.id), { billing_model: tenant.billing_model || 'fixed', billing_rate: rate, billing_frequency: tenant.billing_frequency || 'weekly' }) }} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Billing Model</label>
                                    <select defaultValue={tenant.billing_model || 'fixed'} onChange={(e) => tenant.billing_model = e.target.value} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                                        <option value="fixed">Fixed</option>
                                        <option value="commission">Commission (%)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Billing Rate</label>
                                    <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Frequency</label>
                                    <select defaultValue={tenant.billing_frequency || 'weekly'} onChange={(e) => tenant.billing_frequency = e.target.value} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-4">Last Billed: {tenant.last_billed_at ? new Date(tenant.last_billed_at).toLocaleString() : 'Never'}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700">
                                    Update Billing
                                </button>
                                <button type="button" onClick={() => router.post(route('admin.tenants.invoice.generate', tenant.id))} className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700">
                                    Generate Invoice Now
                                </button>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Commission Calculator</h4>
                                <p className="text-xs text-gray-500 mb-4">Quickly compare fixed vs commission based on the tenant's all-time completed sales volume (Rs. {metrics.total_sales}).</p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">If Fixed at Current Rate</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">Rs. {rate}</p>
                                    </div>
                                    <div className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                                        <p className="text-xs text-indigo-500 dark:text-indigo-400">If {rate}% Commission</p>
                                        <p className="font-semibold text-indigo-900 dark:text-indigo-100">Rs. {((metrics.total_sales || 0) * ((rate || 0) / 100)).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Operations here can permanently affect the tenant's data or access.</p>
                        <button disabled className="bg-red-600 text-white px-4 py-2 rounded shadow opacity-50 cursor-not-allowed">Suspend Tenant</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
