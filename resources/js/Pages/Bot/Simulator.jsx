import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Simulator({ auth, tenants }) {
    const [tenantId, setTenantId] = useState(tenants.length > 0 ? tenants[0].id : '');
    const [phone, setPhone] = useState('+1234567890');
    const [message, setMessage] = useState('ORDER');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const submitWebhook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse('');

        try {
            const res = await axios.post(`/api/bot/whatsapp/webhook/${tenantId}`, {
                From: phone,
                Body: message
            });
            setResponse(JSON.stringify(res.data, null, 2));
        } catch (error) {
            setResponse(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Webhook Simulator</h2>}
        >
            <Head title="Webhook Simulator" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
                        
                        <div className="p-6 text-gray-900 flex-1 border-r border-gray-100">
                            <h3 className="text-lg font-medium mb-4">Simulate Incoming WhatsApp Message</h3>
                            
                            <form onSubmit={submitWebhook} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Target Restaurant (Tenant)</label>
                                    <select
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        value={tenantId}
                                        onChange={e => setTenantId(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a Restaurant</option>
                                        {tenants.map(t => (
                                            <option key={t.id} value={t.id}>{t.name} ({t.id})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Customer Phone Number</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Message Body</label>
                                    <textarea
                                        rows={3}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Send to Webhook'}
                                </button>
                            </form>
                        </div>

                        <div className="p-6 text-gray-900 flex-1 bg-gray-50">
                            <h3 className="text-lg font-medium mb-4">Webhook Response</h3>
                            {response ? (
                                <pre className="bg-gray-800 text-green-400 p-4 rounded-md text-sm overflow-auto max-h-96 whitespace-pre-wrap font-mono">
                                    {response}
                                </pre>
                            ) : (
                                <div className="text-sm text-gray-500 italic">No response yet. Send a message to see the bot's reply.</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
