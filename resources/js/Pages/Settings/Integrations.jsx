import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function Integrations({ whatsapp }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        access_token: whatsapp.access_token || '',
        phone_number_id: whatsapp.phone_number_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.integrations'), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Integration Settings</h2>}
        >
            <Head title="Integrations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">WhatsApp Business API</h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Connect your Meta WhatsApp Business account. You need a permanent access token and the Phone Number ID from your Meta App Dashboard.
                                    </p>
                                </header>

                                <form onSubmit={submit} className="mt-6 space-y-6">
                                    <div>
                                        <InputLabel htmlFor="phone_number_id" value="Meta Phone Number ID" />
                                        <TextInput
                                            id="phone_number_id"
                                            className="mt-1 block w-full"
                                            value={data.phone_number_id}
                                            onChange={(e) => setData('phone_number_id', e.target.value)}
                                            placeholder="e.g. 10245353245"
                                            autoComplete="off"
                                            data-1p-ignore
                                        />
                                        <InputError className="mt-2" message={errors.phone_number_id} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="access_token" value="Permanent Access Token" />
                                        <TextInput
                                            id="access_token"
                                            className="mt-1 block w-full"
                                            value={data.access_token}
                                            onChange={(e) => setData('access_token', e.target.value)}
                                            type="password"
                                            placeholder="EAAG..."
                                            autoComplete="new-password"
                                            data-1p-ignore
                                        />
                                        <InputError className="mt-2" message={errors.access_token} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                                        </Transition>
                                    </div>
                                </form>
                            </section>

                            <section className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700 h-fit">
                                <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">How to get your credentials?</h3>
                                <ol className="list-decimal list-outside ml-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li>Go to the <a href="https://developers.facebook.com/apps/" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Meta App Dashboard</a> and select your app.</li>
                                    <li>In the left sidebar, navigate to <strong>WhatsApp &gt; API Setup</strong>.</li>
                                    <li>Copy the <strong>Phone Number ID</strong> from the "Send and receive messages" section and paste it here.</li>
                                    <li>To get a Permanent Access Token, you must create a System User in your Meta Business Settings and generate a new token.</li>
                                    <li>Assign the <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">whatsapp_business_messaging</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">whatsapp_business_management</code> permissions to the token.</li>
                                    <li>Paste the generated System User Token here and click Save.</li>
                                </ol>
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-100 dark:border-blue-800/50 text-sm text-blue-800 dark:text-blue-200">
                                    <p><strong>Note:</strong> Make sure you have added your actual business phone number to the WhatsApp account in the Meta dashboard, rather than using the default test number.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
