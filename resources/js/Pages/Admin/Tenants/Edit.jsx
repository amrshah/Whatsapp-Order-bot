import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Edit({ tenant, metrics }) {
    return (
        <AdminLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tenant Details: {tenant.id}</h2>}
        >
            <Head title={"Tenant: "} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
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
                        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Operations here can permanently affect the tenant's data or access.</p>
                        <button disabled className="bg-red-600 text-white px-4 py-2 rounded shadow opacity-50 cursor-not-allowed">Suspend Tenant</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
