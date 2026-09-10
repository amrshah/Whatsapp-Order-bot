import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const { appName } = usePage().props;
    const name = appName || 'Ormeasy';

    // ---- Savings Calculator State ----
    const [orders, setOrders] = useState(50);
    const [aov, setAov] = useState(1200);
    const [comm, setComm] = useState(25);

    const fmt = (n) => 'Rs ' + Math.round(n).toLocaleString('en-PK');

    const annualRevenue = orders * aov * 365;
    const commissionLost = annualRevenue * (comm / 100);
    const laborSaved = orders * 365 * 10;
    const flatFee = 4999 * 12;
    const totalSavings = Math.max(0, commissionLost + laborSaved - flatFee);

    // ---- Active Tab Feature Preview ----
    const [activeTab, setActiveTab] = useState('pwa');

    return (
        <>
            <Head title={`${name} — Modern WhatsApp Bot & PWA Restaurant OS`} />

            <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
                {/* ---------- NAVBAR ---------- */}
                <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                O
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-white">
                                {name}<span className="text-emerald-400">OS</span>
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
                            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
                            <a href="#dual-workflow" className="hover:text-emerald-400 transition-colors">Dual Workflow</a>
                            <a href="#kds" className="hover:text-emerald-400 transition-colors">Kitchen Display</a>
                            <a href="#calculator" className="hover:text-emerald-400 transition-colors">ROI Calculator</a>
                            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
                        </nav>

                        <div className="flex items-center gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:shadow-emerald-500/40 transition-all"
                                >
                                    Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-bold text-slate-300 hover:text-white transition-colors hidden sm:block"
                                    >
                                        Merchant Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:shadow-emerald-500/40 transition-all"
                                    >
                                        Get Started Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* ---------- HERO SECTION ---------- */}
                <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-950 to-slate-950 pointer-events-none" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="text-center max-w-3xl mx-auto space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                🚀 The Direct-to-Customer Restaurant OS
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
                                Turn WhatsApp Messages Into <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Direct Commission-Free Orders</span>
                            </h1>

                            <p className="text-lg text-slate-300 sm:text-xl leading-relaxed">
                                Give customers two instant ways to order: directly inside WhatsApp chat or through a 16-character short PWA web link. Manage orders seamlessly on a real-time Kitchen Display System (KDS).
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                                <Link
                                    href={route('register')}
                                    className="rounded-xl bg-emerald-500 px-8 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Start Free 14-Day Trial →
                                </Link>
                                <a
                                    href="#dual-workflow"
                                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-7 py-4 text-base font-bold text-white hover:bg-slate-800 hover:border-slate-700 transition-all"
                                >
                                    Explore Dual Ordering Workflow
                                </a>
                            </div>

                            {/* Trust Row */}
                            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
                                <span className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">✓</span>
                                    0% Commission Fees
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">✓</span>
                                    1-Click Short PWA Link (/t/token)
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">✓</span>
                                    Real-Time WebSocket KDS
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">✓</span>
                                    Live in &lt; 10 Minutes
                                </span>
                            </div>
                        </div>

                        {/* HERO MOCKUP GRAPHIC */}
                        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                            {/* WhatsApp Bot Gateway Card */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl space-y-4 relative overflow-hidden group hover:border-slate-700 transition-all">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                                            WA
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm">WhatsApp Business Gateway</div>
                                            <div className="text-xs text-emerald-400 flex items-center gap-1">
                                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Connected & Active
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">Bot Module</span>
                                </div>

                                <div className="space-y-3 font-sans text-xs">
                                    <div className="bg-slate-800/80 p-3 rounded-lg text-slate-200 max-w-[85%]">
                                        👋 Welcome to Burger Samosa Center! How would you like to place your order today?
                                    </div>
                                    <div className="bg-emerald-950/80 border border-emerald-500/30 p-3 rounded-lg text-emerald-200 max-w-[90%] space-y-2">
                                        <div>📱 <b>Open PWA App:</b></div>
                                        <div className="font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-emerald-500/20">
                                            https://waorder.alamiaai.com/t/hxLPQHSGqM4sFObA
                                        </div>
                                        <div className="text-[11px] text-emerald-300/80">Tap link to browse menu with photos & instant checkout!</div>
                                    </div>
                                    <div className="bg-slate-800/80 p-3 rounded-lg text-slate-200 max-w-[80%]">
                                        1. 📜 Order directly in WhatsApp Chat
                                    </div>
                                </div>
                            </div>

                            {/* PWA App Interface Card */}
                            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl space-y-4 relative overflow-hidden">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                            PWA
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm">Customer PWA App Shell</div>
                                            <div className="text-xs text-slate-400">Zero download required</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md">Fast Mobile UX</span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                                        <div>
                                            <div className="font-bold text-white text-sm">Zinger Burger Combo</div>
                                            <div className="text-xs text-slate-400">Crispy chicken + fries + drink</div>
                                        </div>
                                        <span className="font-bold text-emerald-400 text-sm">Rs 750</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                                        <div>
                                            <div className="font-bold text-white text-sm">Special Pizza Large</div>
                                            <div className="text-xs text-slate-400">Extra cheese & pepperoni</div>
                                        </div>
                                        <span className="font-bold text-emerald-400 text-sm">Rs 1,650</span>
                                    </div>

                                    <div className="bg-emerald-500 p-3 rounded-xl text-slate-950 font-bold text-center text-sm shadow-lg shadow-emerald-500/20">
                                        Instant Checkout (Cash / Online) →
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- DUAL WORKFLOW SECTION ---------- */}
                <section id="dual-workflow" className="py-20 border-t border-slate-800 bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                Two Workflows. One Unified Restaurant OS.
                            </h2>
                            <p className="text-slate-400 text-base">
                                Don't force your customers into a single channel. Give them the freedom of interactive WhatsApp chat or a full-screen mobile PWA web app.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-6 hover:border-emerald-500/50 transition-colors">
                                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold">
                                    💬
                                </div>
                                <h3 className="text-2xl font-bold text-white">1. Direct In-Chat WhatsApp Ordering</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Customers can reply with simple numbers or chat buttons to select menu categories, pick items, and confirm delivery details directly inside WhatsApp chat.
                                </p>
                                <ul className="space-y-2 text-xs font-semibold text-slate-300">
                                    <li className="flex items-center gap-2 text-emerald-400">✓ Dynamic Menu Categories & Products</li>
                                    <li className="flex items-center gap-2 text-emerald-400">✓ Graceful Unknown Response Handler</li>
                                    <li className="flex items-center gap-2 text-emerald-400">✓ Automatic Lead Capture in CRM</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-6 hover:border-emerald-500/50 transition-colors">
                                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
                                    📱
                                </div>
                                <h3 className="text-2xl font-bold text-white">2. Blazing Fast PWA Mini-App</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Generates 16-character signed short links (<code className="text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded">/t/{'{token}'}</code>) valid for 15 minutes. One tap opens a native-like PWA with rich item photos, live cart, and instant order tracking.
                                </p>
                                <ul className="space-y-2 text-xs font-semibold text-slate-300">
                                    <li className="flex items-center gap-2 text-indigo-400">✓ Opaque 15-Minute HttpOnly Session Token</li>
                                    <li className="flex items-center gap-2 text-indigo-400">✓ 1-Click Repeat Customer Reordering</li>
                                    <li className="flex items-center gap-2 text-indigo-400">✓ Real-Time Order Tracking Screen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- REAL-TIME KDS SECTION ---------- */}
                <section id="kds" className="py-20 border-t border-slate-800 bg-slate-950">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                                    🍳 Kitchen Operations
                                </div>

                                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                    Real-Time 3-Stage Kanban Kitchen Display (KDS)
                                </h2>

                                <p className="text-slate-400 text-base leading-relaxed">
                                    Eliminate paper receipts and missed orders. As soon as a customer places an order via WhatsApp or PWA, it immediately pops up on your kitchen display system via Laravel Reverb WebSockets.
                                </p>

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                                        <div>
                                            <div className="font-bold text-white text-sm">New Orders Column</div>
                                            <div className="text-xs text-slate-400">Incoming orders trigger instant audio alerts for kitchen staff.</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                                        <div>
                                            <div className="font-bold text-white text-sm">In Kitchen Preparation</div>
                                            <div className="text-xs text-slate-400">Chefs mark orders in progress to give customers accurate prep timers.</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                                        <div>
                                            <div className="font-bold text-white text-sm">Ready for Delivery / Dispatch</div>
                                            <div className="text-xs text-slate-400">Triggers automated queued WhatsApp order status notifications to customers.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* KDS Visual Preview */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                    <div className="font-bold text-white text-sm flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        Unified Kitchen Display System
                                    </div>
                                    <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Reverb WebSockets Active</span>
                                </div>

                                <div className="grid grid-cols-3 gap-3 text-xs">
                                    <div className="bg-slate-950 p-3 rounded-xl border border-orange-500/30 space-y-2">
                                        <div className="font-bold text-orange-400 text-[11px] uppercase tracking-wider">New Orders (2)</div>
                                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                            <div className="font-bold text-white">#1049 · Takeaway</div>
                                            <div className="text-[11px] text-slate-400">1x Zinger, 1x Fries</div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-950 p-3 rounded-xl border border-indigo-500/30 space-y-2">
                                        <div className="font-bold text-indigo-400 text-[11px] uppercase tracking-wider">In Kitchen (3)</div>
                                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                            <div className="font-bold text-white">#1048 · Delivery</div>
                                            <div className="text-[11px] text-slate-400">2x Club Sandwich</div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30 space-y-2">
                                        <div className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider">Ready (12)</div>
                                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                            <div className="font-bold text-white">#1047 · Dispatched</div>
                                            <div className="text-[11px] text-emerald-400">Rider On Way ✓</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- SAVINGS CALCULATOR ---------- */}
                <section id="calculator" className="py-20 border-t border-slate-800 bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                💰 Merchant ROI Engine
                            </div>
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                Calculate How Much You'll Save Every Year
                            </h2>
                            <p className="text-slate-400 text-base">
                                Delivery aggregators take up to 30% of your gross sales. See how much money stays in your bank account with zero-commission direct ordering.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900 p-8 lg:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Sliders */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                                        <span>Daily Direct Orders</span>
                                        <span className="text-emerald-400 font-mono text-base">{orders} orders/day</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="300"
                                        value={orders}
                                        onChange={(e) => setOrders(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                                        <span>Average Order Value (AOV)</span>
                                        <span className="text-emerald-400 font-mono text-base">{fmt(aov)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="300"
                                        max="5000"
                                        step="50"
                                        value={aov}
                                        onChange={(e) => setAov(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                                        <span>Aggregator Take Rate</span>
                                        <span className="text-emerald-400 font-mono text-base">{comm}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="15"
                                        max="35"
                                        value={comm}
                                        onChange={(e) => setComm(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                    />
                                </div>
                            </div>

                            {/* Savings Output */}
                            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-6 flex flex-col justify-between space-y-6">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                                        Estimated Additional Profit / Year
                                    </div>
                                    <div className="text-4xl font-extrabold text-white font-mono">
                                        {fmt(totalSavings)}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2">
                                        Based on direct orders bypassing delivery aggregator commissions.
                                    </div>
                                </div>

                                <div className="space-y-2 border-t border-emerald-500/20 pt-4 text-xs font-semibold">
                                    <div className="flex justify-between text-slate-300">
                                        <span>Aggregator Commission Avoided:</span>
                                        <span className="font-mono text-emerald-400">{fmt(commissionLost)}/yr</span>
                                    </div>
                                    <div className="flex justify-between text-slate-300">
                                        <span>Estimated Labor Hours Saved:</span>
                                        <span className="font-mono text-emerald-400">{fmt(laborSaved)}/yr</span>
                                    </div>
                                    <div className="flex justify-between text-slate-300">
                                        <span>{name} SaaS Flat Fee:</span>
                                        <span className="font-mono text-slate-400">- Rs 4,999/mo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- PRICING SECTION ---------- */}
                <section id="pricing" className="py-20 border-t border-slate-800 bg-slate-950">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <div className="max-w-3xl mx-auto space-y-4 mb-16">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                Simple Flat Monthly Pricing. Zero Commission.
                            </h2>
                            <p className="text-slate-400 text-base">
                                Keep 100% of your order revenue. Pay one simple flat monthly fee.
                            </p>
                        </div>

                        <div className="max-w-md mx-auto rounded-3xl border-2 border-emerald-500 bg-slate-900 p-8 shadow-2xl space-y-6 relative">
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-1 rounded-full shadow">
                                Popular Restaurant Plan
                            </div>

                            <div>
                                <div className="text-lg font-bold text-slate-300">Restaurant Growth Plan</div>
                                <div className="text-4xl font-extrabold text-white font-mono mt-2">
                                    Rs 4,999<span className="text-base text-slate-400 font-sans font-normal"> / month</span>
                                </div>
                            </div>

                            <ul className="space-y-3 text-sm text-slate-300 text-left border-t border-b border-slate-800 py-6">
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">✓</span> Unlimited Direct Orders & Cart Checkouts
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">✓</span> WhatsApp Gateway + Evolution API Integration
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">✓</span> Fast PWA Mini-App Shell with Short Links
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">✓</span> Real-Time WebSocket Kanban Kitchen Display (KDS)
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">✓</span> Merchant ROI Engine & Revenue Analytics
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">✓</span> 10-Minute Launch Onboarding Checklist
                                </li>
                            </ul>

                            <Link
                                href={route('register')}
                                className="block w-full rounded-xl bg-emerald-500 py-3.5 text-center text-base font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-all"
                            >
                                Start 14-Day Free Trial →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ---------- FOOTER ---------- */}
                <footer className="border-t border-slate-800 bg-slate-950 py-12 text-xs text-slate-500">
                    <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-black text-sm">
                                O
                            </div>
                            <span className="font-bold text-slate-300 text-sm">{name} Restaurant Operating System</span>
                        </div>

                        <div>
                            © {new Date().getFullYear()} {name}. All rights reserved. Zero-latency WhatsApp & PWA restaurant OS.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
