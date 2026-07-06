import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth }) {
    // ---- Savings Calculator State ----
    const [orders, setOrders] = useState(40);
    const [aov, setAov] = useState(1200);
    const [comm, setComm] = useState(30);

    const fmt = (n) => 'Rs ' + Math.round(n).toLocaleString('en-IN');
    
    const annualRevenue = orders * aov * 365;
    const commissionLost = annualRevenue * (comm / 100);
    const laborSaved = orders * 365 * 15;
    const recoveredOrders = annualRevenue * 0.06;
    const flatFee = 4999 * 12;
    const totalSavings = commissionLost + laborSaved + recoveredOrders - flatFee;
    const keptWithTarka = annualRevenue - flatFee;
    
    const maxVal = Math.max(commissionLost, keptWithTarka, 1);
    const aggBarHeight = Math.max(10, (commissionLost/maxVal)*100) + '%';
    const tarkaBarHeight = Math.max(10, (keptWithTarka/maxVal)*100) + '%';

    // ---- FAQ State ----
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const faqs = [
        { q: 'Can customers order in Roman Urdu?', a: "Yes. Hotel Wala Bot's AI understands Roman Urdu, standard Urdu, and English, and can even handle a natural mix of all three in the same conversation." },
        { q: 'Does it work on my existing WhatsApp number?', a: "Yes. There's no need to change your number or ask customers to switch apps. Hotel Wala Bot connects to the WhatsApp Business number you already use." },
        { q: 'Can I update my menu myself?', a: "Absolutely. The Menu Builder lets you add items, prices, and photos, and pause items that are out of stock, all without contacting support." },
        { q: 'How long does setup take?', a: "Most restaurants are live within 30 minutes. Our onboarding team helps you load your menu and connect your WhatsApp number." },
        { q: 'Can multiple staff use the dashboard at once?', a: "Yes. You can add staff accounts with role-based permissions, so kitchen staff only see the Kitchen Display while managers see full analytics." },
        { q: 'Does Hotel Wala Bot support multiple branches?', a: "Yes. Each branch can have its own menu, WhatsApp number, and Kitchen Display, all visible from one owner dashboard." },
        { q: 'What happens after my 14-day free trial?', a: "You can continue on the flat monthly fee with no setup cost, or cancel any time. No credit card is required to start the trial." }
    ];

    // ---- Interactive Demo State ----
    const [activeDemo, setActiveDemo] = useState('order');
    const demoData = {
        order: [
          {who:'in', name:'Customer', text:'Hi! Ek large pepperoni pizza mil sakta hai?'},
          {who:'out', name:'Hotel Wala Bot', text:'Jee zaroor! 1x Large Pepperoni Pizza — Rs 1,650. Delivery ya pickup?'},
          {who:'in', name:'Customer', text:'Delivery, Gulberg III.'},
          {who:'out', name:'Hotel Wala Bot', text:'Order confirm! 🎉 30 min mein pohanch jayega. Kitchen ko notify kar diya gaya hai.'}
        ],
        table: [
          {who:'in', name:'Customer', text:'Aaj raat 8 baje ke liye 4 logon ka table chahiye.'},
          {who:'out', name:'Hotel Wala Bot', text:'Bilkul! Table for 4, tonight 8:00 PM — confirmed. Naam bata dein reservation ke liye?'},
          {who:'in', name:'Customer', text:'Bilal.'},
          {who:'out', name:'Hotel Wala Bot', text:'Shukriya Bilal! Aapka table reserved hai. See you tonight! 🍽️'}
        ],
        menu: [
          {who:'in', name:'Customer', text:'Menu bhej dein please.'},
          {who:'out', name:'Hotel Wala Bot', text:'Yahan hamara menu hai: 🍕 Pizzas, 🍗 BBQ, 🥘 Karahi, 🥤 Beverages. Kis category mein interested hain?'},
          {who:'in', name:'Customer', text:'BBQ dikhayein.'},
          {who:'out', name:'Hotel Wala Bot', text:'Seekh Kabab Rs 950 · Malai Boti Rs 1,050 · Chicken Tikka Rs 850. Order karna chahenge?'}
        ],
        track: [
          {who:'in', name:'Customer', text:'Mera order kahan tak pohancha? #0149'},
          {who:'out', name:'Hotel Wala Bot', text:'Order #0149 abhi kitchen mein tayar ho raha hai — approx 12 min baaki hain.'},
          {who:'in', name:'Customer', text:'Shukriya!'},
          {who:'out', name:'Hotel Wala Bot', text:'Aapka welcome! Rider assign hote hi hum aapko live location bhej denge. 🏍️'}
        ]
    };

    return (
        <>
            <Head title="Hotel Wala Bot — The AI Employee That Runs Your Restaurant's Orders 24/7" />
            <style dangerouslySetInnerHTML={{__html: `
                :root {
                    --ink:#0F172A;
                    --ink-soft:#1E293B;
                    --green:#16A34A;
                    --green-dark:#0F7A38;
                    --orange:#EA580C;
                    --amber:#FBBF24;
                    --cream:#FBF9F4;
                    --card:#FFFFFF;
                    --muted:#64748B;
                    --line:#E7E3D8;
                    --radius:18px;
                    --disp:'Manrope', sans-serif;
                    --body:'Inter', sans-serif;
                    --num:'Space Grotesk', sans-serif;
                }
                * { box-sizing:border-box; margin:0; padding:0; }
                html { scroll-behavior:smooth; }
                body { font-family:var(--body); color:var(--ink); background:var(--cream); line-height:1.5; -webkit-font-smoothing:antialiased; }
                img { max-width:100%; display:block; }
                a { color:inherit; text-decoration:none; }
                h1,h2,h3,h4 { font-family:var(--disp); line-height:1.12; letter-spacing:-0.02em; }
                .wrap { max-width:1180px; margin:0 auto; padding:0 28px; }
                .eyebrow {
                    display:inline-flex; align-items:center; gap:8px;
                    font-size:12.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
                    color:var(--green-dark); background:rgba(22,163,74,.09);
                    padding:6px 14px; border-radius:999px; margin-bottom:18px;
                }
                .eyebrow.on-dark { color:var(--amber); background:rgba(251,191,36,.12); }
                .btn {
                    display:inline-flex; align-items:center; justify-content:center; gap:10px;
                    padding:15px 28px; border-radius:12px; font-weight:700; font-size:15.5px;
                    border:none; cursor:pointer; transition:transform .15s ease, box-shadow .15s ease, background .15s ease;
                    font-family:var(--body);
                }
                .btn:active { transform:translateY(1px); }
                .btn-primary { background:var(--green); color:#fff; box-shadow:0 8px 24px -8px rgba(22,163,74,.55); }
                .btn-primary:hover { background:var(--green-dark); box-shadow:0 10px 28px -6px rgba(22,163,74,.6); }
                .btn-ghost { background:transparent; color:var(--ink); border:1.5px solid rgba(15,23,42,.16); }
                .btn-ghost:hover { border-color:rgba(15,23,42,.35); }
                .btn-ghost.on-dark { color:#fff; border-color:rgba(255,255,255,.28); }
                .btn-ghost.on-dark:hover { border-color:rgba(255,255,255,.55); }
                .btn-light { background:#fff; color:var(--ink); }
                .btn-light:hover { background:var(--amber); }
                section { padding:96px 0; }
                .section-tight { padding:64px 0; }

                /* ---------- NAV ---------- */
                header {
                    position:sticky; top:0; z-index:100;
                    background:rgba(251,249,244,.82); backdrop-filter:blur(10px);
                    border-bottom:1px solid var(--line);
                }
                nav { display:flex; align-items:center; justify-content:space-between; padding:16px 28px; max-width:1180px; margin:0 auto; }
                .logo { display:flex; align-items:center; gap:10px; font-family:var(--disp); font-weight:800; font-size:20px; }
                .logo-mark {
                    width:34px; height:34px; border-radius:10px;
                    background:linear-gradient(135deg, var(--green), var(--green-dark));
                    display:flex; align-items:center; justify-content:center; color:#fff; font-size:17px; font-weight:800;
                    box-shadow:0 4px 12px -3px rgba(22,163,74,.55);
                }
                .nav-links { display:flex; gap:34px; font-size:15px; font-weight:600; color:var(--ink-soft); }
                .nav-links a:hover { color:var(--green-dark); }
                .nav-cta { display:flex; align-items:center; gap:14px; }
                .nav-links, .nav-cta .btn-ghost { display:flex; }
                @media (max-width:860px) { .nav-links{display:none;} }

                /* ---------- HERO ---------- */
                .hero {
                    background:var(--ink); color:#fff; position:relative; overflow:hidden;
                    padding:110px 0 90px;
                }
                .hero::before {
                    content:''; position:absolute; inset:0;
                    background:
                    radial-gradient(600px 400px at 85% -10%, rgba(22,163,74,.35), transparent 60%),
                    radial-gradient(500px 350px at 5% 110%, rgba(234,88,12,.25), transparent 60%);
                    pointer-events:none;
                }
                .hero-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:64px; align-items:center; position:relative; }
                @media (max-width:960px) { .hero-grid{grid-template-columns:1fr;} }
                .hero h1 { font-size:clamp(34px,4.6vw,54px); font-weight:800; margin-bottom:22px; }
                .hero h1 .accent { color:var(--amber); }
                .hero p.sub { font-size:18px; color:rgba(255,255,255,.78); max-width:520px; margin-bottom:30px; }
                .hero-ctas { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:34px; }
                .trust-row { display:flex; flex-wrap:wrap; gap:10px 22px; font-size:14px; color:rgba(255,255,255,.85); margin-bottom:26px; }
                .trust-row span { display:flex; align-items:center; gap:7px; }
                .trust-row span::before { content:'✓'; color:var(--green); font-weight:800; background:rgba(22,163,74,.18); width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; }
                .trusted-by { font-size:13.5px; color:rgba(255,255,255,.55); }

                /* phone mockup */
                .phone {
                    width:290px; margin:0 auto; background:#0b1220; border-radius:34px; padding:14px;
                    box-shadow:0 40px 80px -20px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06);
                    position:relative;
                }
                .phone-screen {
                    background:#e9edc9; background:linear-gradient(180deg,#ece5d8,#e5ddcd);
                    border-radius:22px; overflow:hidden; height:520px; display:flex; flex-direction:column;
                }
                .phone-bar { background:#075E54; color:#fff; padding:14px 16px; display:flex; align-items:center; gap:10px; font-size:13px; font-weight:700; }
                .phone-bar .dot { width:30px; height:30px; border-radius:50%; background:var(--green); display:flex; align-items:center; justify-content:center; font-size:13px; }
                .phone-chat { flex:1; padding:14px; display:flex; flex-direction:column; gap:10px; overflow:hidden; }
                .bubble { max-width:82%; padding:9px 12px; border-radius:12px; font-size:12.8px; line-height:1.35; opacity:0; animation:pop .5s ease forwards; color:var(--ink); }
                .bubble.in { background:#fff; align-self:flex-start; border-bottom-left-radius:2px; }
                .bubble.out { background:#DCF8C6; align-self:flex-end; border-bottom-right-radius:2px; }
                .bubble b { display:block; font-size:11px; color:var(--green-dark); margin-bottom:2px; }
                .bubble.d1 { animation-delay:.2s } .bubble.d2 { animation-delay:1s } .bubble.d3 { animation-delay:1.8s } .bubble.d4 { animation-delay:2.6s } .bubble.d5 { animation-delay:3.4s }
                @keyframes pop { from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }
                .ticket-pop {
                    margin:0 14px 14px; background:#fff; border-radius:12px; padding:12px 14px; font-size:12px;
                    border:1.5px dashed var(--green); opacity:0; animation:pop .6s ease forwards; animation-delay:4.1s;
                    box-shadow:0 8px 20px -6px rgba(0,0,0,.15);
                }
                .ticket-pop .tt { font-weight:800; color:var(--green-dark); font-family:var(--num); font-size:13px; margin-bottom:4px; display:flex; justify-content:space-between; }

                /* ---------- PERFECT FOR ---------- */
                .perfect-for { background:var(--cream); padding:56px 0; }
                .pf-row { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; }
                .pf-chip {
                    background:#fff; border:1px solid var(--line); border-radius:14px; padding:14px 22px;
                    font-weight:700; font-size:15px; display:flex; align-items:center; gap:10px;
                    box-shadow:0 2px 0 rgba(15,23,42,.03); transition:transform .15s ease, box-shadow .15s ease;
                }
                .pf-chip:hover { transform:translateY(-3px); box-shadow:0 10px 20px -10px rgba(15,23,42,.25); }
                .pf-chip .ic { font-size:20px; }

                /* ---------- PROBLEM ---------- */
                .problem { background:var(--ink); color:#fff; }
                .problem h2 { font-size:clamp(28px,3.6vw,42px); margin-bottom:14px; max-width:640px; }
                .problem .lede { color:rgba(255,255,255,.65); font-size:17px; max-width:560px; margin-bottom:48px; }
                .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-bottom:52px; }
                @media (max-width:800px) { .stat-row{grid-template-columns:1fr;} }
                .stat-card { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:var(--radius); padding:28px; }
                .stat-card .big { font-family:var(--num); font-size:38px; font-weight:700; color:var(--amber); margin-bottom:10px; }
                .stat-card p { color:rgba(255,255,255,.72); font-size:15px; }
                .quote-block { border-left:3px solid var(--orange); padding-left:24px; font-family:var(--disp); font-size:clamp(20px,2.6vw,28px); font-weight:700; max-width:720px; }

                /* ---------- SOLUTION ---------- */
                .solution-grid { display:grid; grid-template-columns:.9fr 1.1fr; gap:60px; align-items:center; }
                @media (max-width:900px) { .solution-grid{grid-template-columns:1fr;} }
                .dash-mock {
                    background:linear-gradient(160deg,#fff,#f4f1e8); border-radius:20px; padding:22px;
                    border:1px solid var(--line); box-shadow:0 30px 60px -30px rgba(15,23,42,.35);
                }
                .dash-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
                .dash-top .tag { font-size:12px; font-weight:700; color:var(--green-dark); background:rgba(22,163,74,.12); padding:4px 10px; border-radius:999px; }
                .kds-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
                .kds-card { background:#fff; border:1px solid var(--line); border-radius:12px; padding:14px; }
                .kds-card .kh { font-size:11px; color:var(--muted); font-weight:600; text-transform:uppercase; letter-spacing:.05em; margin-bottom:6px; }
                .kds-card .kv { font-family:var(--num); font-size:24px; font-weight:700; }
                .kds-card.pending .kv { color:var(--orange); }
                .kds-card.done .kv { color:var(--green-dark); }
                .order-ticket { background:#0F172A; color:#fff; border-radius:12px; padding:14px 16px; margin-top:12px; position:relative; overflow:hidden; }
                .order-ticket::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--amber); }
                .order-ticket .ot-top { display:flex; justify-content:space-between; font-size:12px; color:rgba(255,255,255,.6); margin-bottom:6px; }
                .order-ticket .ot-item { display:flex; justify-content:space-between; font-size:14px; font-weight:600; margin-bottom:3px; }

                .card-2x2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
                .feat-card { background:#fff; border:1px solid var(--line); border-radius:16px; padding:22px; }
                .feat-card h4 { font-size:17px; margin-bottom:6px; }
                .feat-card p { font-size:14.5px; color:var(--muted); }
                .feat-card .num { font-family:var(--num); font-size:13px; color:var(--green-dark); font-weight:700; margin-bottom:10px; display:block; }

                /* ---------- CALCULATOR (signature) ---------- */
                .calc-section { background:linear-gradient(180deg,#0F172A 0%, #10241c 100%); color:#fff; position:relative; overflow:hidden; }
                .calc-section::after { content:''; position:absolute; inset:0; background:radial-gradient(700px 400px at 50% 0%, rgba(22,163,74,.25), transparent 65%); pointer-events:none; }
                .calc-head { text-align:center; max-width:640px; margin:0 auto 52px; position:relative; }
                .calc-head h2 { font-size:clamp(28px,3.8vw,44px); margin-bottom:14px; }
                .calc-head p { color:rgba(255,255,255,.68); font-size:16.5px; }
                .calc-box {
                    background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12); border-radius:24px;
                    padding:40px; display:grid; grid-template-columns:1fr 1fr; gap:48px; position:relative;
                    backdrop-filter:blur(6px);
                }
                @media (max-width:900px) { .calc-box{grid-template-columns:1fr; padding:26px;} }
                .slider-group { margin-bottom:30px; }
                .slider-group:last-child { margin-bottom:0; }
                .slider-label { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px; font-size:14.5px; color:rgba(255,255,255,.8); font-weight:600; }
                .slider-label .val { font-family:var(--num); font-size:20px; font-weight:700; color:var(--amber); }
                input[type=range] {
                    -webkit-appearance:none; width:100%; height:6px; border-radius:999px;
                    background:rgba(255,255,255,.15); outline:none;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance:none; width:22px; height:22px; border-radius:50%;
                    background:var(--green); border:3px solid #fff; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,.4);
                }
                input[type=range]::-moz-range-thumb {
                    width:22px; height:22px; border-radius:50%; background:var(--green); border:3px solid #fff; cursor:pointer;
                }
                .bars { display:flex; gap:24px; align-items:flex-end; height:180px; margin:8px 0 20px; }
                .bar-col { flex:1; display:flex; flex-direction:column; align-items:center; gap:10px; height:100%; justify-content:flex-end; }
                .bar-col .bar { width:56%; border-radius:8px 8px 0 0; transition:height .5s cubic-bezier(.2,.8,.2,1); }
                .bar-col.aggregator .bar { background:linear-gradient(180deg, var(--orange), #b1420a); }
                .bar-col.tarka .bar { background:linear-gradient(180deg, var(--green), var(--green-dark)); }
                .bar-col .bl { font-size:12.5px; color:rgba(255,255,255,.65); font-weight:600; text-align:center; }
                .bar-col .bv { font-family:var(--num); font-weight:700; font-size:15px; color:#fff; }
                .result-card { background:rgba(22,163,74,.12); border:1px solid rgba(22,163,74,.4); border-radius:18px; padding:24px; }
                .result-card .rl { font-size:13px; color:rgba(255,255,255,.7); text-transform:uppercase; letter-spacing:.06em; font-weight:700; margin-bottom:6px; }
                .result-card .rv { font-family:var(--num); font-size:clamp(30px,4vw,42px); font-weight:700; color:var(--green); line-height:1; }
                .breakdown { display:flex; flex-direction:column; gap:12px; margin-top:22px; }
                .bd-row { display:flex; justify-content:space-between; font-size:14.5px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.08); }
                .bd-row .bl2 { color:rgba(255,255,255,.75); display:flex; align-items:center; gap:8px; }
                .bd-row .br2 { font-family:var(--num); font-weight:700; color:#fff; }
                .calc-footnote { text-align:center; margin-top:28px; font-size:14px; color:rgba(255,255,255,.5); position:relative; }

                /* ---------- HOW IT WORKS ---------- */
                .steps { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:52px; }
                @media (max-width:900px) { .steps{grid-template-columns:1fr 1fr;} }
                @media (max-width:560px) { .steps{grid-template-columns:1fr;} }
                .step { position:relative; background:#fff; border:1px solid var(--line); border-radius:18px; padding:26px 22px; }
                .step .sn { font-family:var(--num); font-size:13px; color:var(--muted); font-weight:600; margin-bottom:14px; }
                .step .si { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:16px; }
                .step:nth-child(1) .si { background:rgba(22,163,74,.12); }
                .step:nth-child(2) .si { background:rgba(234,88,12,.12); }
                .step:nth-child(3) .si { background:rgba(251,191,36,.18); }
                .step:nth-child(4) .si { background:rgba(15,23,42,.08); }
                .step h4 { font-size:16.5px; margin-bottom:6px; }
                .step p { font-size:14px; color:var(--muted); }
                .step-arrow { position:absolute; right:-26px; top:50%; transform:translateY(-50%); color:var(--line); font-size:22px; }
                @media (max-width:900px) { .step-arrow{display:none;} }

                /* ---------- WHY OWNERS LOVE IT ---------- */
                .love-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:52px; }
                @media (max-width:860px) { .love-grid{grid-template-columns:1fr 1fr;} }
                @media (max-width:560px) { .love-grid{grid-template-columns:1fr;} }
                .love-card { background:#fff; border:1px solid var(--line); border-radius:18px; padding:28px; }
                .love-card .lic { font-size:26px; margin-bottom:14px; }
                .love-card h4 { font-size:17.5px; margin-bottom:8px; }
                .love-card p { font-size:14.5px; color:var(--muted); }

                /* ---------- FEATURES GRID ---------- */
                .feat-grid-wrap { background:var(--ink); color:#fff; }
                .fgrid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:48px; }
                @media (max-width:860px) { .fgrid{grid-template-columns:repeat(2,1fr);} }
                .fchip {
                    background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:14px;
                    padding:18px; font-size:14.5px; font-weight:600; display:flex; align-items:center; gap:10px;
                    transition:background .15s ease, border-color .15s ease;
                }
                .fchip:hover { background:rgba(22,163,74,.12); border-color:rgba(22,163,74,.4); }
                .fchip .fdot { width:8px; height:8px; border-radius:50%; background:var(--green); flex-shrink:0; }

                /* ---------- INTERACTIVE DEMO ---------- */
                .demo-grid { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
                @media (max-width:900px) { .demo-grid{grid-template-columns:1fr;} }
                .demo-buttons { display:flex; flex-direction:column; gap:12px; }
                .demo-btn {
                    text-align:left; padding:16px 18px; border-radius:12px; border:1.5px solid var(--line); background:#fff;
                    font-weight:700; font-size:15px; cursor:pointer; display:flex; align-items:center; gap:12px;
                    transition:border-color .15s ease, background .15s ease;
                }
                .demo-btn:hover { border-color:var(--green); }
                .demo-btn.active { border-color:var(--green); background:rgba(22,163,74,.06); color:var(--green-dark); }
                .demo-phone { width:280px; margin:0 auto; }

                /* ---------- TESTIMONIALS ---------- */
                .test-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:52px; }
                @media (max-width:900px) { .test-grid{grid-template-columns:1fr;} }
                .test-card { background:#fff; border:1px solid var(--line); border-radius:18px; padding:26px; }
                .test-top { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
                .avatar { width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; color:#fff; font-family:var(--disp); font-size:16px; }
                .test-name { font-weight:700; font-size:14.5px; }
                .test-loc { font-size:12.5px; color:var(--muted); }
                .test-quote { font-size:14.5px; color:var(--ink-soft); margin-bottom:16px; }
                .test-metric { display:inline-flex; align-items:center; gap:6px; background:rgba(22,163,74,.1); color:var(--green-dark); font-weight:700; font-size:13px; padding:5px 12px; border-radius:999px; }

                /* ---------- PRICING ---------- */
                .price-wrap { max-width:420px; margin:52px auto 0; background:#fff; border:2px solid var(--green); border-radius:22px; padding:36px; text-align:center; box-shadow:0 30px 60px -30px rgba(22,163,74,.4); }
                .price-wrap .pv { font-family:var(--num); font-size:44px; font-weight:700; margin:16px 0 4px; }
                .price-wrap .pv span { font-size:16px; font-weight:600; color:var(--muted); }
                .price-list { text-align:left; margin:26px 0; display:flex; flex-direction:column; gap:10px; font-size:14.5px; }
                .price-list li { list-style:none; display:flex; gap:10px; align-items:flex-start; }
                .price-list li::before { content:'✓'; color:var(--green); font-weight:800; }

                /* ---------- FAQ ---------- */
                .faq-item { border-bottom:1px solid var(--line); padding:22px 0; }
                .faq-q { display:flex; justify-content:space-between; align-items:center; cursor:pointer; font-weight:700; font-size:16px; gap:20px; }
                .faq-q .plus { font-size:20px; color:var(--green-dark); transition:transform .2s ease; flex-shrink:0; }
                .faq-item.open .plus { transform:rotate(45deg); }
                .faq-a { max-height:0; overflow:hidden; transition:max-height .25s ease; }
                .faq-a p { padding-top:12px; font-size:14.5px; color:var(--muted); max-width:680px; }

                /* ---------- FINAL CTA ---------- */
                .final-cta { background:var(--ink); color:#fff; text-align:center; position:relative; overflow:hidden; }
                .final-cta::before { content:''; position:absolute; inset:0; background:radial-gradient(500px 300px at 50% 100%, rgba(22,163,74,.3), transparent 65%); }
                .final-cta h2 { font-size:clamp(28px,4vw,44px); max-width:700px; margin:0 auto 18px; position:relative; }
                .final-cta p { color:rgba(255,255,255,.68); font-size:17px; margin-bottom:34px; position:relative; }
                .final-cta .btn { position:relative; }

                /* ---------- FOOTER ---------- */
                footer { background:#0b1220; color:rgba(255,255,255,.55); padding:52px 0 30px; font-size:13.5px; }
                .foot-grid { display:flex; justify-content:space-between; flex-wrap:wrap; gap:32px; margin-bottom:36px; }
                .foot-col h5 { color:#fff; font-size:14px; margin-bottom:14px; font-family:var(--disp); }
                .foot-col a { display:block; margin-bottom:9px; color:rgba(255,255,255,.55); }
                .foot-col a:hover { color:#fff; }
                .foot-bottom { border-top:1px solid rgba(255,255,255,.1); padding-top:22px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; }

                .center { text-align:center; }
                .section-head { max-width:640px; margin:0 auto 20px; }
                .section-head.left { margin:0 0 20px; }
                .section-head p.lede { color:var(--muted); font-size:16.5px; }
            `}} />

            <header>
            <nav>
                <div className="logo"><div className="logo-mark">H</div>Hotel Wala Bot!</div>
                <div className="nav-links">
                <a href="#how">How it Works</a>
                <a href="#calculator">Savings Calculator</a>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#faq">FAQ</a>
                </div>
                <div className="nav-cta">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="btn btn-primary" style={{padding:'10px 20px', fontSize:'14px'}}>Dashboard</Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="btn btn-ghost" style={{padding:'10px 18px', fontSize:'14px'}}>Login / Partner with Us</Link>
                            <Link href={route('register')} className="btn btn-primary" style={{padding:'10px 20px', fontSize:'14px'}}>Start Free Trial</Link>
                        </>
                    )}
                </div>
            </nav>
            </header>

            {/* HERO */}
            <section className="hero">
            <div className="wrap hero-grid">
                <div>
                <div className="eyebrow on-dark">The Zero-Latency Restaurant OS</div>
                <h1>Every WhatsApp Message Is Now <span className="accent">a Confirmed Order.</span></h1>
                <p className="sub">Turn your restaurant's WhatsApp into an AI employee that answers customers instantly, takes accurate orders, updates your kitchen in real time, and stops the commission bleed to delivery apps.</p>
                <div className="hero-ctas">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="btn btn-primary">Go to Dashboard</Link>
                    ) : (
                        <Link href={route('register')} className="btn btn-primary">Start Free for 14 Days</Link>
                    )}
                    <a href="#demo" className="btn btn-ghost on-dark">▶ Watch 2-Minute Demo</a>
                </div>
                <div className="trust-row">
                    <span>Orders confirmed in under 3 seconds</span>
                    <span>English + Roman Urdu</span>
                    <span>Zero commission</span>
                    <span>Live in under 30 minutes</span>
                </div>
                <div className="trusted-by">Trusted by restaurants, cafés, cloud kitchens, home chefs and fast-food brands across Pakistan.</div>
                </div>
                <div>
                <div className="phone">
                    <div className="phone-screen">
                    <div className="phone-bar"><div className="dot">🍴</div> Karachi Karahi House</div>
                    <div className="phone-chat">
                        <div className="bubble in d1"><b>Ahmed</b>Assalam-o-alaikum, ek chicken karahi full aur 4 roti mil sakti hai?</div>
                        <div className="bubble out d2"><b>Hotel Wala Bot</b>Jee zaroor! 1x Chicken Karahi (Full) + 4 Roti. Total: Rs 2,150. Delivery ya pickup?</div>
                        <div className="bubble in d3">Delivery please, DHA Phase 5.</div>
                        <div className="bubble out d4">Order confirm! 🎉 25-30 min mein pohanch jayega. Payment: Cash on Delivery.</div>
                    </div>
                    <div className="ticket-pop">
                        <div className="tt"><span>KITCHEN TICKET #0148</span><span>2 min ago</span></div>
                        <div style={{color:'var(--muted)'}}>1x Chicken Karahi (Full) · 4x Roti · DHA Phase 5</div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* PERFECT FOR */}
            <section className="perfect-for">
            <div className="wrap">
                <div className="section-head center" style={{marginBottom:'32px'}}>
                <div className="eyebrow">Perfect For</div>
                <h2 style={{fontSize:'26px'}}>Built for how Pakistan actually orders food</h2>
                </div>
                <div className="pf-row">
                <div className="pf-chip"><span className="ic">🍔</span>Fast Food</div>
                <div className="pf-chip"><span className="ic">☕</span>Cafés</div>
                <div className="pf-chip"><span className="ic">🍽️</span>Restaurants</div>
                <div className="pf-chip"><span className="ic">🥘</span>Dhabas</div>
                <div className="pf-chip"><span className="ic">👩‍🍳</span>Home Chefs</div>
                <div className="pf-chip"><span className="ic">🍱</span>Catering</div>
                <div className="pf-chip"><span className="ic">🏍️</span>Cloud Kitchens</div>
                <div className="pf-chip"><span className="ic">🍕</span>Pizza Shops</div>
                </div>
            </div>
            </section>

            {/* PROBLEM */}
            <section className="problem">
            <div className="wrap">
                <div className="eyebrow on-dark">The Problem</div>
                <h2>Stop Losing Orders. Stop Paying Commissions.</h2>
                <p className="lede">Every restaurant running orders through WhatsApp and delivery apps hits the same three walls, every single night.</p>
                <div className="stat-row">
                <div className="stat-card">
                    <div className="big">37%</div>
                    <p>of customers who don't get a reply within 5 minutes order from a competitor instead.</p>
                </div>
                <div className="stat-card">
                    <div className="big">1 in 6</div>
                    <p>manually-taken WhatsApp orders has a mistake — wrong item, wrong address, or wrong total.</p>
                </div>
                <div className="stat-card">
                    <div className="big">up to 30%</div>
                    <p>of every single sale is taken by delivery aggregators, before you've paid for ingredients or staff.</p>
                </div>
                </div>
                <div className="quote-block">"Every unanswered WhatsApp message is money walking out the door."</div>
            </div>
            </section>

            {/* SOLUTION */}
            <section>
            <div className="wrap solution-grid">
                <div>
                <div className="eyebrow">The Solution</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,36px)', marginBottom:'16px'}}>Meet Your New AI Restaurant Manager</h2>
                <p style={{color:'var(--muted)', fontSize:'16px', marginBottom:'28px'}}>Hotel Wala Bot handles everything from the first "hello" to the kitchen ticket — automatically, in the language your customers actually type in.</p>
                <div className="card-2x2">
                    <div className="feat-card"><span className="num">Reads & Replies</span><h4>Takes Orders</h4><p>Understands menus, customizations, and calculates the bill instantly.</p></div>
                    <div className="feat-card"><span className="num">24/7</span><h4>Replies Instantly</h4><p>Available day and night. No customer ever waits on hold.</p></div>
                    <div className="feat-card"><span className="num">Live Sync</span><h4>Updates Kitchen</h4><p>Every order appears instantly on your Kitchen Display System.</p></div>
                    <div className="feat-card"><span className="num">Yours to Keep</span><h4>Collects Customer Data</h4><p>Build your own customer database. No middleman in between.</p></div>
                </div>
                </div>
                <div className="dash-mock">
                <div className="dash-top"><strong>Live Kitchen Display</strong><span className="tag">● Live</span></div>
                <div className="kds-row">
                    <div className="kds-card pending"><div className="kh">Pending</div><div className="kv">6</div></div>
                    <div className="kds-card done"><div className="kh">Completed Today</div><div className="kv">142</div></div>
                </div>
                <div className="order-ticket">
                    <div className="ot-top"><span>ORDER #0149</span><span>Table / Delivery</span></div>
                    <div className="ot-item"><span>1x Beef Seekh Kabab</span><span>Rs 950</span></div>
                    <div className="ot-item"><span>2x Naan</span><span>Rs 120</span></div>
                    <div className="ot-item"><span>1x Mint Margarita</span><span>Rs 250</span></div>
                </div>
                <div className="order-ticket" style={{marginTop:'10px', opacity:0.6}}>
                    <div className="ot-top"><span>ORDER #0148</span><span style={{color:'var(--green)'}}>Ready ✓</span></div>
                    <div className="ot-item"><span>1x Chicken Karahi Full</span><span>Rs 2,150</span></div>
                </div>
                </div>
            </div>
            </section>

            {/* CALCULATOR */}
            <section className="calc-section" id="calculator">
            <div className="wrap">
                <div className="calc-head">
                <div className="eyebrow on-dark">⭐ See Your Own Numbers</div>
                <h2>How Much Are Delivery Apps Costing You?</h2>
                <p>Move the sliders to match your restaurant. Watch what stays in your pocket instead of theirs.</p>
                </div>
                <div className="calc-box">
                <div>
                    <div className="slider-group">
                    <div className="slider-label"><span>Orders per day</span><span className="val">{orders}</span></div>
                    <input type="range" min="5" max="300" value={orders} onChange={e => setOrders(e.target.value)} />
                    </div>
                    <div className="slider-group">
                    <div className="slider-label"><span>Average order value (Rs)</span><span className="val">{aov.toLocaleString('en-IN')}</span></div>
                    <input type="range" min="300" max="5000" step="50" value={aov} onChange={e => setAov(e.target.value)} />
                    </div>
                    <div className="slider-group">
                    <div className="slider-label"><span>Current aggregator commission</span><span className="val">{comm}%</span></div>
                    <input type="range" min="10" max="35" value={comm} onChange={e => setComm(e.target.value)} />
                    </div>
                    <div className="bars">
                    <div className="bar-col aggregator">
                        <div className="bv">{fmt(commissionLost)}</div>
                        <div className="bar" style={{height: aggBarHeight}}></div>
                        <div className="bl">Lost to Delivery Apps / yr</div>
                    </div>
                    <div className="bar-col tarka">
                        <div className="bv">{fmt(keptWithTarka)}</div>
                        <div className="bar" style={{height: tarkaBarHeight}}></div>
                        <div className="bl">Kept With Hotel Wala Bot / yr</div>
                    </div>
                    </div>
                </div>
                <div>
                    <div className="result-card">
                    <div className="rl">Estimated Additional Profit / Year</div>
                    <div className="rv">{fmt(Math.max(totalSavings, 0))}</div>
                    </div>
                    <div className="breakdown">
                    <div className="bd-row"><span className="bl2">💰 Commission avoided</span><span className="br2">{fmt(commissionLost)}</span></div>
                    <div className="bd-row"><span className="bl2">🤖 Staff hours saved (est.)</span><span className="br2">{fmt(laborSaved)}</span></div>
                    <div className="bd-row"><span className="bl2">📈 Recovered missed orders</span><span className="br2">{fmt(recoveredOrders)}</span></div>
                    <div className="bd-row" style={{borderBottom:'none'}}><span className="bl2">Hotel Wala Bot flat fee</span><span className="br2" style={{color:'var(--amber)'}}>− Rs 4,999 / mo</span></div>
                    </div>
                </div>
                </div>
                <div className="calc-footnote">🎉 That's often enough to hire another employee — or fund your next branch.</div>
            </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how">
            <div className="wrap">
                <div className="section-head center">
                <div className="eyebrow">How It Works</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,36px)'}}>From "Hello" to Hot Food, in Four Steps</h2>
                </div>
                <div className="steps">
                <div className="step"><div className="sn">STEP 1</div><div className="si">💬</div><h4>Customer Messages</h4><p>They text your existing WhatsApp number — no new app to download.</p><div className="step-arrow">→</div></div>
                <div className="step"><div className="sn">STEP 2</div><div className="si">🤖</div><h4>AI Takes the Order</h4><p>Hotel Wala Bot replies, confirms items, and calculates the total in seconds.</p><div className="step-arrow">→</div></div>
                <div className="step"><div className="sn">STEP 3</div><div className="si">🖥️</div><h4>Kitchen Gets Notified</h4><p>The order lands on your Kitchen Display instantly, with an audio alert.</p><div className="step-arrow">→</div></div>
                <div className="step"><div className="sn">STEP 4</div><div className="si">✅</div><h4>Ready to Serve</h4><p>Marked ready for pickup or handed to your rider — fully tracked.</p></div>
                </div>
            </div>
            </section>

            {/* WHY OWNERS LOVE IT */}
            <section style={{background:'var(--cream)'}}>
            <div className="wrap">
                <div className="section-head center">
                <div className="eyebrow">Why Owners Love It</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,36px)'}}>Stop Paying Thousands Every Month in Commissions</h2>
                <p className="lede">Own your customers. Own your data. Own your profits.</p>
                </div>
                <div className="love-grid">
                <div className="love-card"><div className="lic">⚡</div><h4>Never Miss an Order</h4><p>AI replies within seconds, even during your busiest rush hour.</p></div>
                <div className="love-card"><div className="lic">🌙</div><h4>Available 24/7</h4><p>Customers can order even after your staff has gone home.</p></div>
                <div className="love-card"><div className="lic">🎯</div><h4>Fewer Mistakes</h4><p>Orders go straight to the kitchen — no mishearing, no lost notes.</p></div>
                <div className="love-card"><div className="lic">💵</div><h4>Higher Profit</h4><p>Keep every rupee from every order placed directly with you.</p></div>
                <div className="love-card"><div className="lic">📇</div><h4>Customer Database</h4><p>Own your customer list forever — no aggregator standing in between.</p></div>
                <div className="love-card"><div className="lic">⭐</div><h4>Better Reviews</h4><p>Faster replies and accurate orders mean happier, returning customers.</p></div>
                </div>
            </div>
            </section>

            {/* FEATURES */}
            <section className="feat-grid-wrap" id="features">
            <div className="wrap">
                <div className="section-head center">
                <div className="eyebrow on-dark">Built for Scale</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,36px)'}}>Everything Your Restaurant Needs, on Autopilot</h2>
                </div>
                <div className="fgrid">
                <div className="fchip"><span className="fdot"></span>AI WhatsApp Ordering</div>
                <div className="fchip"><span className="fdot"></span>Kitchen Display System</div>
                <div className="fchip"><span className="fdot"></span>Roman Urdu Support</div>
                <div className="fchip"><span className="fdot"></span>English Support</div>
                <div className="fchip"><span className="fdot"></span>Voice Note Ordering</div>
                <div className="fchip"><span className="fdot"></span>Live Order Tracking</div>
                <div className="fchip"><span className="fdot"></span>Real-Time Dashboard</div>
                <div className="fchip"><span className="fdot"></span>Sales Analytics</div>
                <div className="fchip"><span className="fdot"></span>Broadcast Campaigns</div>
                <div className="fchip"><span className="fdot"></span>Customer CRM</div>
                <div className="fchip"><span className="fdot"></span>QR Code Menu</div>
                <div className="fchip"><span className="fdot"></span>Online Payments</div>
                <div className="fchip"><span className="fdot"></span>Cash on Delivery</div>
                <div className="fchip"><span className="fdot"></span>Staff Role Permissions</div>
                <div className="fchip"><span className="fdot"></span>Multiple Branches</div>
                <div className="fchip"><span className="fdot"></span>Coupons & Discounts</div>
                <div className="fchip"><span className="fdot"></span>Menu Builder</div>
                <div className="fchip"><span className="fdot"></span>Automated Reports</div>
                <div className="fchip"><span className="fdot"></span>Inventory (Coming Soon)</div>
                <div className="fchip"><span className="fdot"></span>Cloud Hosted</div>
                </div>
            </div>
            </section>

            {/* INTERACTIVE DEMO */}
            <section id="demo">
            <div className="wrap demo-grid">
                <div>
                <div className="eyebrow">Try It Yourself</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,34px)', marginBottom:'16px'}}>See Hotel Wala Bot Handle a Real Order</h2>
                <p style={{color:'var(--muted)', fontSize:'16px', marginBottom:'28px'}}>Tap an option below and watch the conversation update, exactly like your customers would experience it.</p>
                <div className="demo-buttons">
                    <button className={`demo-btn ${activeDemo === 'order' ? 'active' : ''}`} onClick={() => setActiveDemo('order')}>🍕 Order Food</button>
                    <button className={`demo-btn ${activeDemo === 'table' ? 'active' : ''}`} onClick={() => setActiveDemo('table')}>🪑 Reserve a Table</button>
                    <button className={`demo-btn ${activeDemo === 'menu' ? 'active' : ''}`} onClick={() => setActiveDemo('menu')}>📋 Ask for Menu</button>
                    <button className={`demo-btn ${activeDemo === 'track' ? 'active' : ''}`} onClick={() => setActiveDemo('track')}>📍 Track My Order</button>
                </div>
                </div>
                <div className="demo-phone">
                <div className="phone" style={{width:'280px'}}>
                    <div className="phone-screen" style={{height:'420px'}}>
                    <div className="phone-bar"><div className="dot">🍴</div> Demo Chat</div>
                    <div className="phone-chat">
                        {demoData[activeDemo].map((msg, i) => (
                            <div key={i} className={`bubble ${msg.who === 'in' ? 'in' : 'out'}`} style={{animationDelay: `${i * 0.35}s`}}>
                                <b>{msg.name}</b>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* TESTIMONIALS */}
            <section style={{background:'var(--cream)'}}>
            <div className="wrap">
                <div className="section-head center">
                <div className="eyebrow">Real Restaurants</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,36px)'}}>Owners Are Already Seeing the Difference</h2>
                </div>
                <div className="test-grid">
                <div className="test-card">
                    <div className="test-top"><div className="avatar" style={{background:'var(--green)'}}>AK</div><div><div className="test-name">Cloud Kitchen Owner</div><div className="test-loc">Lahore</div></div></div>
                    <p className="test-quote">"We stopped juggling three delivery app tablets. Now every WhatsApp order lands straight on our kitchen screen — no more mix-ups during rush hour."</p>
                    <div className="test-metric">↑ 100% direct orders kept</div>
                </div>
                <div className="test-card">
                    <div className="test-top"><div className="avatar" style={{background:'var(--orange)'}}>RH</div><div><div className="test-name">Dhaba Owner</div><div className="test-loc">Islamabad</div></div></div>
                    <p className="test-quote">"Roman Urdu support was the deciding factor. Our regular customers just text the way they always have, and it understands them perfectly."</p>
                    <div className="test-metric">↓ 30% fewer wrong orders</div>
                </div>
                <div className="test-card">
                    <div className="test-top"><div className="avatar" style={{background:'var(--amber)', color:'var(--ink)'}}>SF</div><div><div className="test-name">Home Chef</div><div className="test-loc">Karachi</div></div></div>
                    <p className="test-quote">"I run this solo. Hotel Wala Bot replies while I'm cooking, so I never lose an order because I couldn't get to my phone in time."</p>
                    <div className="test-metric">↑ 24/7 order coverage</div>
                </div>
                </div>
            </div>
            </section>

            {/* PRICING */}
            <section id="pricing">
            <div className="wrap center">
                <div className="eyebrow">Simple Pricing</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,36px)'}}>One Flat Fee. Zero Commission. Ever.</h2>
                <div className="price-wrap">
                <div style={{fontWeight:'700', color:'var(--muted)', fontSize:'14px', textTransform:'uppercase', letterSpacing:'.05em'}}>Hotel Wala Bot Standard</div>
                <div className="pv">Rs 4,999<span>/month</span></div>
                <ul className="price-list">
                    <li>Unlimited WhatsApp orders</li>
                    <li>English + Roman Urdu AI agent</li>
                    <li>Live Kitchen Display System</li>
                    <li>Real-time dashboard & analytics</li>
                    <li>Customer database, fully yours</li>
                    <li>Setup & onboarding included</li>
                </ul>
                <Link href={route('register')} className="btn btn-primary" style={{width:'100%'}}>Start Your 14-Day Free Trial</Link>
                </div>
            </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{background:'var(--cream)'}}>
            <div className="wrap" style={{maxWidth:'840px'}}>
                <div className="section-head center">
                <div className="eyebrow">FAQ</div>
                <h2 style={{fontSize:'clamp(26px,3.2vw,34px)'}}>Questions Restaurant Owners Ask</h2>
                </div>
                <div id="faqList">
                {faqs.map((faq, i) => (
                    <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                        <div className="faq-q" onClick={() => toggleFaq(i)}>
                            <span>{faq.q}</span>
                            <span className="plus" style={{transform: openFaq === i ? 'rotate(45deg)' : 'none'}}>+</span>
                        </div>
                        <div className="faq-a" style={{maxHeight: openFaq === i ? '500px' : '0'}}>
                            <p>{faq.a}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            </section>

            {/* FINAL CTA */}
            <section className="final-cta" id="trial">
            <div className="wrap">
                <h2>Your Restaurant Deserves Better Than Missed Messages and High Commissions.</h2>
                <p>Start accepting direct WhatsApp orders in under 15 minutes.</p>
                <Link href={route('register')} className="btn btn-light">Start Free Trial — No Credit Card</Link>
            </div>
            </section>

            <footer>
            <div className="wrap">
                <div className="foot-grid">
                <div className="foot-col">
                    <div className="logo" style={{color:'#fff'}}><div className="logo-mark">H</div>Hotel Wala Bot</div>
                    <p style={{marginTop:'12px', maxWidth:'220px', color:'rgba(255,255,255,.5)'}}>The zero-latency restaurant OS for WhatsApp ordering.</p>
                </div>
                <div className="foot-col">
                    <h5>Product</h5>
                    <a href="#how">How it Works</a>
                    <a href="#calculator">Savings Calculator</a>
                    <a href="#features">Features</a>
                    <a href="#pricing">Pricing</a>
                </div>
                <div className="foot-col">
                    <h5>Company</h5>
                    <a href="#">About</a>
                    <a href="#">Partner with Us</a>
                    <a href="#faq">FAQ</a>
                    <a href="#">Contact</a>
                </div>
                <div className="foot-col">
                    <h5>Get Started</h5>
                    <a href="#trial">Start Free Trial</a>
                    <Link href={route('login')}>Login</Link>
                </div>
                </div>
                <div className="foot-bottom">
                <span>© {new Date().getFullYear()} Hotel Wala Bot. All rights reserved.</span>
                <span>Made for restaurants across Pakistan.</span>
                </div>
            </div>
            </footer>
        </>
    );
}
