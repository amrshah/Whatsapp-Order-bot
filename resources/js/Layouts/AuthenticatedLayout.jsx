import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Smartphone } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const tenant = usePage().props.tenant;

    const hasCapability = (cap) => {
        if (!tenant) return true;
        return tenant.capabilities && tenant.capabilities.includes(cap);
    };

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>

                                {hasCapability('ordering') && (
                                    <div className="hidden sm:flex sm:items-center">
                                        <div className="relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button type="button" className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none h-16 ${route().current('orders.*') ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-gray-100' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300'}`}>
                                                        Orders
                                                        <svg className="ml-1 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('orders.kds-unified')}>Unified KDS</Dropdown.Link>
                                                    <Dropdown.Link href={route('orders.create')}>POS (Manual Order)</Dropdown.Link>
                                                    <Dropdown.Link href={route('simulator.index')}>Customer Bot Interface</Dropdown.Link>
                                                    <Dropdown.Link href={route('orders.history')}>Order History</Dropdown.Link>
                                                    <Dropdown.Link href={route('orders.index')}>Old KDS</Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                )}

                                {hasCapability('catalog') && (
                                    <div className="hidden sm:flex sm:items-center">
                                        <div className="relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button type="button" className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none h-16 ${route().current('menu.*') ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-gray-100' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300'}`}>
                                                        Menu
                                                        <svg className="ml-1 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('menu.categories.index')}>Categories</Dropdown.Link>
                                                    <Dropdown.Link href={route('menu.products.index')}>Products</Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                )}

                                <NavLink
                                    href={route('crm.index')}
                                    active={route().current('crm.*')}
                                >
                                    CRM
                                </NavLink>
                                <div className="hidden sm:flex sm:items-center">
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button type="button" className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none h-16 ${route().current('settings.*') ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-gray-100' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300'}`}>
                                                    Settings
                                                    <svg className="ml-1 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('settings.integrations')}>Integrations</Dropdown.Link>
                                                <Dropdown.Link href={route('settings.billing')}>Billing</Dropdown.Link>
                                                <Dropdown.Link href={route('settings.miniapp')}>Mini-App Configuration</Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            {user.tenant_id && (
                                <a
                                    href={route('pwa.menu', { tenant_slug: user.tenant_id })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="me-3 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition duration-150 ease-in-out shadow-sm"
                                >
                                    <Smartphone className="w-3.5 h-3.5" /> View Your App
                                </a>
                            )}
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        {hasCapability('ordering') && (
                            <>
                                <div className="block px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</div>
                                <ResponsiveNavLink
                                    href={route('orders.kds-unified')}
                                    active={route().current('orders.kds-unified')}
                                    className="pl-6"
                                >
                                    Unified KDS
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('orders.create')}
                                    active={route().current('orders.create')}
                                    className="pl-6"
                                >
                                    POS (Manual Order)
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('simulator.index')}
                                    active={route().current('simulator.index')}
                                    className="pl-6"
                                >
                                    Customer Bot Interface
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('orders.history')}
                                    active={route().current('orders.history')}
                                    className="pl-6"
                                >
                                    Order History
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('orders.index')}
                                    active={route().current('orders.index')}
                                    className="pl-6"
                                >
                                    Old KDS
                                </ResponsiveNavLink>
                            </>
                        )}

                        {hasCapability('catalog') && (
                            <>
                                <div className="block px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Menu</div>
                                <ResponsiveNavLink
                                    href={route('menu.categories.index')}
                                    active={route().current('menu.categories.*')}
                                    className="pl-6"
                                >
                                    Categories
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('menu.products.index')}
                                    active={route().current('menu.products.*')}
                                    className="pl-6"
                                >
                                    Products
                                </ResponsiveNavLink>
                            </>
                        )}

                        <div className="block px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Management</div>
                        <ResponsiveNavLink
                            href={route('crm.index')}
                            active={route().current('crm.*')}
                            className="pl-6"
                        >
                            CRM
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('settings.integrations')}
                            active={route().current('settings.integrations')}
                            className="pl-6"
                        >
                            Integrations
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('settings.billing')}
                            active={route().current('settings.billing')}
                            className="pl-6"
                        >
                            Billing
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('settings.miniapp')}
                            active={route().current('settings.miniapp')}
                            className="pl-6"
                        >
                            Mini-App Settings
                        </ResponsiveNavLink>
                        {user.tenant_id && (
                            <ResponsiveNavLink
                                href={route('pwa.menu', { tenant_slug: user.tenant_id })}
                                target="_blank"
                                className="pl-6 text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5"
                            >
                                <Smartphone className="w-4 h-4" /> View Your App
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {usePage().props.tenant?.hasPendingInvoices && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm" role="alert">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">Attention Required</p>
                                <p>You have pending invoices. Please go to your Billing Settings to review and settle them.</p>
                            </div>
                            <Link href={route('settings.billing')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm transition">
                                View Billing
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
