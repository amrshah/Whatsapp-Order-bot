import React, { useState, useEffect } from 'react';
import PwaLayout from '@/Layouts/PwaLayout';
import { Head } from '@inertiajs/react';

export default function OrderMenu({ tenant, customer, categories }) {
    // Cart state
    const [cart, setCart] = useState([]);
    
    // UI states
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState(categories[0]?.id || '');
    const [customizingProduct, setCustomizingProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    
    // Customization selections
    const [selectedVariant, setSelectedVariant] = useState('Regular');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [specialNotes, setSpecialNotes] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Checkout form state
    const [checkoutForm, setCheckoutForm] = useState({
        customer_name: customer?.name || '',
        customer_phone: customer?.phone || '',
        order_type: 'delivery',
        delivery_address: customer?.addresses?.[0]?.address || '',
        delivery_notes: '',
        payment_method: 'cod',
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Filter products
    const filteredCategories = categories.map(cat => {
        const filteredProducts = cat.products.filter(prod => 
            prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        return { ...cat, products: filteredProducts };
    }).filter(cat => cat.products.length > 0);

    // Cart calculations
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Add simple product directly or open options drawer
    const handleProductClick = (product) => {
        setCustomizingProduct(product);
        setSelectedVariant('Regular');
        setSelectedAddOns([]);
        setSpecialNotes('');
        setQuantity(1);
    };

    const addToCart = () => {
        if (!customizingProduct) return;

        // Build customized item
        const itemPrice = customizingProduct.price; // Expand here for dynamic variant prices
        const cartItem = {
            id: customizingProduct.id + '-' + selectedVariant + '-' + selectedAddOns.join(','),
            product_id: customizingProduct.id,
            name: customizingProduct.name,
            variant: selectedVariant,
            add_ons: selectedAddOns,
            notes: specialNotes,
            price: itemPrice,
            quantity: quantity,
        };

        setCart(prev => {
            const exists = prev.find(item => item.id === cartItem.id);
            if (exists) {
                return prev.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, cartItem];
        });

        setCustomizingProduct(null);
    };

    const updateQuantity = (itemId, amount) => {
        setCart(prev => prev.map(item => {
            if (item.id === itemId) {
                const newQty = item.quantity + amount;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        const newErrors = {};
        if (!checkoutForm.customer_name) newErrors.customer_name = 'Name is required';
        if (!checkoutForm.customer_phone) newErrors.customer_phone = 'Phone number is required';
        if (checkoutForm.order_type === 'delivery' && !checkoutForm.delivery_address) {
            newErrors.delivery_address = 'Delivery address is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        // Submit order data
        fetch(`/order/${tenant.id}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                customer_name: checkoutForm.customer_name,
                customer_phone: checkoutForm.customer_phone,
                order_type: checkoutForm.order_type,
                delivery_address: checkoutForm.delivery_address,
                delivery_notes: checkoutForm.delivery_notes,
                cart: cart.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity
                }))
            })
        })
        .then(async res => {
            const data = await res.json();
            if (data.success) {
                window.location.href = data.redirect_url;
            } else {
                setErrors(data.errors || { general: 'Failed to place order.' });
                setIsSubmitting(false);
            }
        })
        .catch(() => {
            setErrors({ general: 'Network error. Please try again.' });
            setIsSubmitting(false);
        });
    };

    return (
        <PwaLayout tenantName={tenant.name}>
            <Head title={`${tenant.name} - Online Menu`} />

            {/* Visual banner */}
            <div className="relative h-36 bg-gray-900 overflow-hidden flex items-center justify-center text-white px-4">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600')] bg-cover bg-center"></div>
                <div className="relative text-center">
                    <h2 className="text-xl font-black uppercase tracking-wider">{tenant.name}</h2>
                    <p className="text-xs text-gray-300 mt-1">Direct ordering via WhatsApp companion app</p>
                </div>
            </div>

            {/* Search Input */}
            <div className="px-4 py-3 bg-white sticky top-[60px] z-30 border-b border-gray-100 flex gap-2">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search menu..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Category tabs */}
            <div className="flex overflow-x-auto bg-white border-b border-gray-100 px-2 py-2 sticky top-[115px] z-20 scrollbar-none gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                            activeTab === cat.id
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Catalog list */}
            <div className="flex-1 px-4 py-4 space-y-8">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        <span className="text-3xl">🏜️</span>
                        <p className="text-sm mt-2">No matching items found</p>
                    </div>
                ) : (
                    filteredCategories
                        .filter(cat => activeTab === '' || cat.id === activeTab)
                        .map((category) => (
                            <div key={category.id} className="space-y-3">
                                <h3 className="text-base font-extrabold text-gray-900 border-l-4 border-red-500 pl-2">
                                    {category.name}
                                </h3>
                                <div className="space-y-3">
                                    {category.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="bg-white border border-gray-100 rounded-xl p-3 flex gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                            onClick={() => handleProductClick(product)}
                                        >
                                            {/* Product Image Fallback */}
                                            <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl border border-gray-100">
                                                🍔
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">{product.name}</h4>
                                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                                        {product.description || 'Delicious gourmet recipe cooked fresh.'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-sm font-black text-red-600">
                                                        Rs. {product.price}
                                                    </span>
                                                    <button
                                                        className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                                                    >
                                                        <span>+</span> Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                )}
            </div>

            {/* Bottom floating cart bar */}
            {cartCount > 0 && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-40">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg flex items-center justify-between transition-transform active:scale-95"
                    >
                        <div className="flex items-center gap-2">
                            <span className="bg-red-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                            <span className="text-sm">View Cart</span>
                        </div>
                        <span className="text-sm font-extrabold">Rs. {cartTotal} ➔</span>
                    </button>
                </div>
            )}

            {/* Product Customization Modal */}
            {customizingProduct && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center px-4">
                    <div className="w-full max-w-md bg-white rounded-t-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">{customizingProduct.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{customizingProduct.description}</p>
                            </div>
                            <button
                                onClick={() => setCustomizingProduct(null)}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-extrabold text-gray-700 block">Select Variant</label>
                            <div className="flex gap-2">
                                {['Regular', 'Large', 'Extra Large'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedVariant(size)}
                                        className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-colors ${
                                            selectedVariant === size
                                                ? 'border-red-500 bg-red-50 text-red-600'
                                                : 'border-gray-200 text-gray-600'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="space-y-2">
                            <label className="text-xs font-extrabold text-gray-700 block">Special Instructions</label>
                            <textarea
                                placeholder="E.g., No onions, extra spicy, etc."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                                rows="2"
                                value={specialNotes}
                                onChange={(e) => setSpecialNotes(e.target.value)}
                            />
                        </div>

                        {/* Quantity and Add Button */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="text-gray-500 hover:text-gray-900 font-bold px-2"
                                >
                                    -
                                </button>
                                <span className="text-sm font-bold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="text-gray-500 hover:text-gray-900 font-bold px-2"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={addToCart}
                                className="flex-1 ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-xs"
                            >
                                Add to Cart (Rs. {customizingProduct.price * quantity})
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
                    <div className="w-full max-w-md bg-white rounded-t-2xl flex flex-col max-h-[85vh]">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-gray-900">Your Basket</h3>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-gray-400 hover:text-gray-600 text-sm"
                            >
                                Close
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                                        <p className="text-[10px] text-gray-500">
                                            {item.variant} {item.notes ? `• "${item.notes}"` : ''}
                                        </p>
                                        <span className="text-xs font-black text-gray-900">Rs. {item.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="text-xs font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
                            <div className="flex justify-between items-center text-sm font-bold text-gray-900">
                                <span>Subtotal</span>
                                <span>Rs. {cartTotal}</span>
                            </div>
                            <button
                                onClick={() => {
                                    setIsCartOpen(false);
                                    setIsCheckoutOpen(true);
                                }}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-xs"
                            >
                                Checkout Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Checkout Drawer */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
                    <form
                        onSubmit={handleCheckoutSubmit}
                        className="w-full max-w-md bg-white rounded-t-2xl flex flex-col max-h-[90vh] p-5 space-y-4 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                            <h3 className="text-sm font-bold text-gray-900">Order Checkout</h3>
                            <button
                                type="button"
                                onClick={() => setIsCheckoutOpen(false)}
                                className="text-gray-400 hover:text-gray-600 text-sm"
                            >
                                Close
                            </button>
                        </div>

                        {errors.general && (
                            <div className="bg-red-50 text-red-600 text-xs p-2.5 rounded-lg font-bold">
                                {errors.general}
                            </div>
                        )}

                        {/* Order Type Toggle */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-500 uppercase">Option</label>
                            <div className="flex gap-2">
                                {['delivery', 'takeaway'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setCheckoutForm(prev => ({ ...prev, order_type: type }))}
                                        className={`flex-1 py-2 text-xs font-bold border rounded-lg capitalize transition-colors ${
                                            checkoutForm.order_type === type
                                                ? 'border-red-500 bg-red-50 text-red-600'
                                                : 'border-gray-200 text-gray-600'
                                        }`}
                                    >
                                        🛵 {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[10px] font-extrabold text-gray-500 uppercase">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-red-500"
                                    placeholder="Name"
                                    value={checkoutForm.customer_name}
                                    onChange={(e) => setCheckoutForm(prev => ({ ...prev, customer_name: e.target.value }))}
                                />
                                {errors.customer_name && <span className="text-[10px] text-red-500 font-bold">{errors.customer_name}</span>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-extrabold text-gray-500 uppercase">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-red-500"
                                    placeholder="Phone"
                                    value={checkoutForm.customer_phone}
                                    onChange={(e) => setCheckoutForm(prev => ({ ...prev, customer_phone: e.target.value }))}
                                />
                                {errors.customer_phone && <span className="text-[10px] text-red-500 font-bold">{errors.customer_phone}</span>}
                            </div>
                        </div>

                        {/* Delivery Address */}
                        {checkoutForm.order_type === 'delivery' && (
                            <div className="space-y-1">
                                <label className="text-[10px] font-extrabold text-gray-500 uppercase">Delivery Address</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-red-500"
                                    placeholder="Complete street details"
                                    rows="2"
                                    value={checkoutForm.delivery_address}
                                    onChange={(e) => setCheckoutForm(prev => ({ ...prev, delivery_address: e.target.value }))}
                                />
                                {errors.delivery_address && <span className="text-[10px] text-red-500 font-bold">{errors.delivery_address}</span>}
                            </div>
                        )}

                        {/* Note to Kitchen */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-gray-500 uppercase">Special Delivery Notes</label>
                            <input
                                type="text"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-red-500"
                                placeholder="E.g., Ring bell, call before arrival"
                                value={checkoutForm.delivery_notes}
                                onChange={(e) => setCheckoutForm(prev => ({ ...prev, delivery_notes: e.target.value }))}
                            />
                        </div>

                        {/* Payment Selection */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-gray-500 uppercase">Payment Option</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCheckoutForm(prev => ({ ...prev, payment_method: 'cod' }))}
                                    className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-colors ${
                                        checkoutForm.payment_method === 'cod'
                                            ? 'border-red-500 bg-red-50 text-red-600'
                                            : 'border-gray-200 text-gray-600'
                                    }`}
                                >
                                    💵 Cash on Delivery
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="border-t border-gray-100 pt-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-xs disabled:bg-gray-400"
                            >
                                {isSubmitting ? 'Placing Order...' : `Place Order (Rs. ${cartTotal})`}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </PwaLayout>
    );
}
