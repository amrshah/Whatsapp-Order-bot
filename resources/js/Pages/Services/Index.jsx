import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { Clock, DollarSign, Edit, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ auth, services = [] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [deletingService, setDeletingService] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        name: '',
        description: '',
        duration_minutes: 30,
        price: '',
        is_active: true,
    });

    const {
        delete: destroy,
        processing: deleteProcessing,
    } = useForm();

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditingService(null);
        setIsCreateOpen(true);
    };

    const openEditModal = (service) => {
        clearErrors();
        setEditingService(service);
        setData({
            name: service.name,
            description: service.description || '',
            duration_minutes: service.duration_minutes || 30,
            price: service.price || '',
            is_active: Boolean(service.is_active),
        });
        setIsCreateOpen(true);
    };

    const closeModal = () => {
        setIsCreateOpen(false);
        setEditingService(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingService) {
            put(route('services.update', editingService.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('services.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (service) => {
        setDeletingService(service);
    };

    const handleDelete = () => {
        if (!deletingService) return;
        destroy(route('services.destroy', deletingService.id), {
            onSuccess: () => setDeletingService(null),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            Service Catalog
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Configure services, session durations, and pricing for your clients.
                        </p>
                    </div>
                    <PrimaryButton
                        onClick={openCreateModal}
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Service
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Service Catalog" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {services.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-2xl p-12 text-center">
                            <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                                <Sparkles className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                No services created yet
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2">
                                Start by adding your professional services, consultation packages, or treatment offerings.
                            </p>
                            <div className="mt-6">
                                <PrimaryButton onClick={openCreateModal} className="inline-flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Your First Service
                                </PrimaryButton>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-snug">
                                                {service.name}
                                            </h3>
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                                    service.is_active
                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                                }`}
                                            >
                                                {service.is_active ? 'Active' : 'Disabled'}
                                            </span>
                                        </div>

                                        {service.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                                                {service.description}
                                            </p>
                                        )}

                                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                                <Clock className="w-4 h-4 text-indigo-500" />
                                                <span>{service.duration_minutes} mins</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white text-base">
                                                <DollarSign className="w-4 h-4 text-emerald-500 -mr-1" />
                                                <span>{Number(service.price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-2">
                                        <SecondaryButton
                                            onClick={() => openEditModal(service)}
                                            className="px-3 py-1.5 text-xs flex items-center gap-1.5"
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                            Edit
                                        </SecondaryButton>
                                        <button
                                            type="button"
                                            onClick={() => confirmDelete(service)}
                                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                                            title="Delete service"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit Modal */}
            <Modal show={isCreateOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={submit} className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {editingService ? 'Edit Service' : 'Add New Service'}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Fill in details for this service offering.
                    </p>

                    <div className="mt-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Service Name *" />
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. General Consultation / Tooth Extraction"
                                required
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 text-sm"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Short explanation of what this service covers..."
                            />
                            <InputError message={errors.description} className="mt-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="duration_minutes" value="Duration (Minutes) *" />
                                <TextInput
                                    id="duration_minutes"
                                    type="number"
                                    min="5"
                                    max="480"
                                    step="5"
                                    className="mt-1 block w-full"
                                    value={data.duration_minutes}
                                    onChange={(e) => setData('duration_minutes', e.target.value)}
                                    required
                                />
                                <InputError message={errors.duration_minutes} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Price ($) *" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                                <InputError message={errors.price} className="mt-1" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Service is active & available for booking
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingService ? 'Save Changes' : 'Create Service'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={Boolean(deletingService)} onClose={() => setDeletingService(null)} maxWidth="sm">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        Delete Service
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Are you sure you want to remove <strong className="text-gray-900 dark:text-white">"{deletingService?.name}"</strong>? This cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setDeletingService(null)}>
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
