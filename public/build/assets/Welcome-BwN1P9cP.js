import{c as e,d as t,n,o as r,r as i,t as a}from"./app-7eKQtR-G.js";var o=t(e(),1),s=a();function c({auth:e}){let{appName:t}=r().props,a=t||`{name}`,[c,l]=(0,o.useState)(40),[u,d]=(0,o.useState)(1200),[f,p]=(0,o.useState)(30),m=e=>`Rs `+Math.round(e).toLocaleString(`en-IN`),h=c*u*365,g=f/100*h,_=c*365*15,v=h*.06,y=4999*12,b=g+_+v-y,x=h-y,S=Math.max(g,x,1),C=Math.max(10,g/S*100)+`%`,w=Math.max(10,x/S*100)+`%`,[T,E]=(0,o.useState)(null),D=e=>{E(T===e?null:e)},O=[{q:`Can customers order in Roman Urdu?`,a:`Yes. ${a}'s AI understands Roman Urdu, standard Urdu, and English, and can even handle a natural mix of all three in the same conversation.`},{q:`Does it work on my existing WhatsApp number?`,a:`Yes. There's no need to change your number or ask customers to switch apps. ${a} connects to the WhatsApp Business number you already use.`},{q:`Can I update my menu myself?`,a:`Absolutely. The Menu Builder lets you add items, prices, and photos, and pause items that are out of stock, all without contacting support.`},{q:`How long does setup take?`,a:`Most restaurants are live within 30 minutes. Our onboarding team helps you load your menu and connect your WhatsApp number.`},{q:`Can multiple staff use the dashboard at once?`,a:`Yes. You can add staff accounts with role-based permissions, so kitchen staff only see the Kitchen Display while managers see full analytics.`},{q:`Does ${a} support multiple branches?`,a:`Yes. Each branch can have its own menu, WhatsApp number, and Kitchen Display, all visible from one owner dashboard.`},{q:`What happens after my 14-day free trial?`,a:`You can continue on the flat monthly fee with no setup cost, or cancel any time. No credit card is required to start the trial.`}],[k,A]=(0,o.useState)(`order`),j={order:[{who:`in`,name:`Customer`,text:`Hi! Ek large pepperoni pizza mil sakta hai?`},{who:`out`,name:a,text:`Jee zaroor! 1x Large Pepperoni Pizza — Rs 1,650. Delivery ya pickup?`},{who:`in`,name:`Customer`,text:`Delivery, Gulberg III.`},{who:`out`,name:a,text:`Order confirm! 30 min mein pohanch jayega. Kitchen ko notify kar diya gaya hai.`}],table:[{who:`in`,name:`Customer`,text:`Aaj raat 8 baje ke liye 4 logon ka table chahiye.`},{who:`out`,name:a,text:`Bilkul! Table for 4, tonight 8:00 PM — confirmed. Naam bata dein reservation ke liye?`},{who:`in`,name:`Customer`,text:`Bilal.`},{who:`out`,name:a,text:`Shukriya Bilal! Aapka table reserved hai. See you tonight!`}],menu:[{who:`in`,name:`Customer`,text:`Menu bhej dein please.`},{who:`out`,name:a,text:`Yahan hamara menu hai: Pizzas, BBQ, Karahi, Beverages. Kis category mein interested hain?`},{who:`in`,name:`Customer`,text:`BBQ dikhayein.`},{who:`out`,name:a,text:`Seekh Kabab Rs 950 · Malai Boti Rs 1,050 · Chicken Tikka Rs 850. Order karna chahenge?`}],track:[{who:`in`,name:`Customer`,text:`Mera order kahan tak pohancha? #0149`},{who:`out`,name:a,text:`Order #0149 abhi kitchen mein tayar ho raha hai — approx 12 min baaki hain.`},{who:`in`,name:`Customer`,text:`Shukriya!`},{who:`out`,name:a,text:`Aapka welcome! Rider assign hote hi hum aapko live location bhej denge.`}]};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n,{title:`${a} — The AI Employee That Runs Your Restaurant's Orders 24/7`}),(0,s.jsx)(`style`,{dangerouslySetInnerHTML:{__html:`
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
            `}}),(0,s.jsx)(`header`,{children:(0,s.jsxs)(`nav`,{children:[(0,s.jsxs)(`div`,{className:`logo`,children:[(0,s.jsx)(`div`,{className:`logo-mark`,children:`H`}),a,`!`]}),(0,s.jsxs)(`div`,{className:`nav-links`,children:[(0,s.jsx)(`a`,{href:`#how`,children:`How it Works`}),(0,s.jsx)(`a`,{href:`#calculator`,children:`Savings Calculator`}),(0,s.jsx)(`a`,{href:`#features`,children:`Features`}),(0,s.jsx)(`a`,{href:`#pricing`,children:`Pricing`}),(0,s.jsx)(`a`,{href:`#faq`,children:`FAQ`})]}),(0,s.jsx)(`div`,{className:`nav-cta`,children:e?.user?(0,s.jsx)(i,{href:route(`dashboard`),className:`btn btn-primary`,style:{padding:`10px 20px`,fontSize:`14px`},children:`Dashboard`}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{href:route(`login`),className:`btn btn-ghost`,style:{padding:`10px 18px`,fontSize:`14px`},children:`Login / Partner with Us`}),(0,s.jsx)(i,{href:route(`register`),className:`btn btn-primary`,style:{padding:`10px 20px`,fontSize:`14px`},children:`Start Free Trial`})]})})]})}),(0,s.jsx)(`section`,{className:`hero`,children:(0,s.jsxs)(`div`,{className:`wrap hero-grid`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`eyebrow on-dark`,children:`The Zero-Latency Restaurant OS`}),(0,s.jsxs)(`h1`,{children:[`Every WhatsApp Message Is Now `,(0,s.jsx)(`span`,{className:`accent`,children:`a Confirmed Order.`})]}),(0,s.jsx)(`p`,{className:`sub`,children:`Turn your restaurant's WhatsApp into an AI employee that answers customers instantly, takes accurate orders, updates your kitchen in real time, and stops the commission bleed to delivery apps.`}),(0,s.jsxs)(`div`,{className:`hero-ctas`,children:[e?.user?(0,s.jsx)(i,{href:route(`dashboard`),className:`btn btn-primary`,children:`Go to Dashboard`}):(0,s.jsx)(i,{href:route(`register`),className:`btn btn-primary`,children:`Start Free for 14 Days`}),(0,s.jsx)(`a`,{href:`#demo`,className:`btn btn-ghost on-dark`,children:`▶ Watch 2-Minute Demo`})]}),(0,s.jsxs)(`div`,{className:`trust-row`,children:[(0,s.jsx)(`span`,{children:`Orders confirmed in under 3 seconds`}),(0,s.jsx)(`span`,{children:`English + Roman Urdu`}),(0,s.jsx)(`span`,{children:`Zero commission`}),(0,s.jsx)(`span`,{children:`Live in under 30 minutes`})]}),(0,s.jsx)(`div`,{className:`trusted-by`,children:`Trusted by restaurants, cafés, cloud kitchens, home chefs and fast-food brands across Pakistan.`})]}),(0,s.jsx)(`div`,{children:(0,s.jsx)(`div`,{className:`phone`,children:(0,s.jsxs)(`div`,{className:`phone-screen`,children:[(0,s.jsxs)(`div`,{className:`phone-bar`,children:[(0,s.jsx)(`div`,{className:`dot`,children:`K`}),` Karachi Karahi House`]}),(0,s.jsxs)(`div`,{className:`phone-chat`,children:[(0,s.jsxs)(`div`,{className:`bubble in d1`,children:[(0,s.jsx)(`b`,{children:`Ahmed`}),`Assalam-o-alaikum, ek chicken karahi full aur 4 roti mil sakti hai?`]}),(0,s.jsxs)(`div`,{className:`bubble out d2`,children:[(0,s.jsx)(`b`,{children:a}),`Jee zaroor! 1x Chicken Karahi (Full) + 4 Roti. Total: Rs 2,150. Delivery ya pickup?`]}),(0,s.jsx)(`div`,{className:`bubble in d3`,children:`Delivery please, DHA Phase 5.`}),(0,s.jsx)(`div`,{className:`bubble out d4`,children:`Order confirm! 25-30 min mein pohanch jayega. Payment: Cash on Delivery.`})]}),(0,s.jsxs)(`div`,{className:`ticket-pop`,children:[(0,s.jsxs)(`div`,{className:`tt`,children:[(0,s.jsx)(`span`,{children:`KITCHEN TICKET #0148`}),(0,s.jsx)(`span`,{children:`2 min ago`})]}),(0,s.jsx)(`div`,{style:{color:`var(--muted)`},children:`1x Chicken Karahi (Full) · 4x Roti · DHA Phase 5`})]})]})})})]})}),(0,s.jsx)(`section`,{className:`perfect-for`,children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsxs)(`div`,{className:`section-head center`,style:{marginBottom:`32px`},children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`Perfect For`}),(0,s.jsx)(`h2`,{style:{fontSize:`26px`},children:`Built for how Pakistan actually orders food`})]}),(0,s.jsxs)(`div`,{className:`pf-row`,children:[(0,s.jsx)(`div`,{className:`pf-chip`,children:`Fast Food`}),(0,s.jsx)(`div`,{className:`pf-chip`,children:`Cafés`}),(0,s.jsx)(`div`,{className:`pf-chip`,children:`Restaurants`}),(0,s.jsx)(`div`,{className:`pf-chip`,children:`Dhabas`}),(0,s.jsx)(`div`,{className:`pf-chip`,children:`Home Chefs`}),(0,s.jsx)(`div`,{className:`pf-chip`,children:`Catering`}),(0,s.jsx)(`div`,{className:`pf-chip`,children:`Cloud Kitchens`}),(0,s.jsx)(`div`,{className:`pf-chip`,children:`Pizza Shops`})]})]})}),(0,s.jsx)(`section`,{className:`problem`,children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsx)(`div`,{className:`eyebrow on-dark`,children:`The Problem`}),(0,s.jsx)(`h2`,{children:`Stop Losing Orders. Stop Paying Commissions.`}),(0,s.jsx)(`p`,{className:`lede`,children:`Every restaurant running orders through WhatsApp and delivery apps hits the same three walls, every single night.`}),(0,s.jsxs)(`div`,{className:`stat-row`,children:[(0,s.jsxs)(`div`,{className:`stat-card`,children:[(0,s.jsx)(`div`,{className:`big`,children:`37%`}),(0,s.jsx)(`p`,{children:`of customers who don't get a reply within 5 minutes order from a competitor instead.`})]}),(0,s.jsxs)(`div`,{className:`stat-card`,children:[(0,s.jsx)(`div`,{className:`big`,children:`1 in 6`}),(0,s.jsx)(`p`,{children:`manually-taken WhatsApp orders has a mistake — wrong item, wrong address, or wrong total.`})]}),(0,s.jsxs)(`div`,{className:`stat-card`,children:[(0,s.jsx)(`div`,{className:`big`,children:`up to 30%`}),(0,s.jsx)(`p`,{children:`of every single sale is taken by delivery aggregators, before you've paid for ingredients or staff.`})]})]}),(0,s.jsx)(`div`,{className:`quote-block`,children:`"Every unanswered WhatsApp message is money walking out the door."`})]})}),(0,s.jsx)(`section`,{children:(0,s.jsxs)(`div`,{className:`wrap solution-grid`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`The Solution`}),(0,s.jsx)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,36px)`,marginBottom:`16px`},children:`Meet Your New AI Restaurant Manager`}),(0,s.jsxs)(`p`,{style:{color:`var(--muted)`,fontSize:`16px`,marginBottom:`28px`},children:[a,` handles everything from the first "hello" to the kitchen ticket — automatically, in the language your customers actually type in.`]}),(0,s.jsxs)(`div`,{className:`card-2x2`,children:[(0,s.jsxs)(`div`,{className:`feat-card`,children:[(0,s.jsx)(`span`,{className:`num`,children:`Reads & Replies`}),(0,s.jsx)(`h4`,{children:`Takes Orders`}),(0,s.jsx)(`p`,{children:`Understands menus, customizations, and calculates the bill instantly.`})]}),(0,s.jsxs)(`div`,{className:`feat-card`,children:[(0,s.jsx)(`span`,{className:`num`,children:`24/7`}),(0,s.jsx)(`h4`,{children:`Replies Instantly`}),(0,s.jsx)(`p`,{children:`Available day and night. No customer ever waits on hold.`})]}),(0,s.jsxs)(`div`,{className:`feat-card`,children:[(0,s.jsx)(`span`,{className:`num`,children:`Live Sync`}),(0,s.jsx)(`h4`,{children:`Updates Kitchen`}),(0,s.jsx)(`p`,{children:`Every order appears instantly on your Kitchen Display System.`})]}),(0,s.jsxs)(`div`,{className:`feat-card`,children:[(0,s.jsx)(`span`,{className:`num`,children:`Yours to Keep`}),(0,s.jsx)(`h4`,{children:`Collects Customer Data`}),(0,s.jsx)(`p`,{children:`Build your own customer database. No middleman in between.`})]})]})]}),(0,s.jsxs)(`div`,{className:`dash-mock`,children:[(0,s.jsxs)(`div`,{className:`dash-top`,children:[(0,s.jsx)(`strong`,{children:`Live Kitchen Display`}),(0,s.jsx)(`span`,{className:`tag`,children:`● Live`})]}),(0,s.jsxs)(`div`,{className:`kds-row`,children:[(0,s.jsxs)(`div`,{className:`kds-card pending`,children:[(0,s.jsx)(`div`,{className:`kh`,children:`Pending`}),(0,s.jsx)(`div`,{className:`kv`,children:`6`})]}),(0,s.jsxs)(`div`,{className:`kds-card done`,children:[(0,s.jsx)(`div`,{className:`kh`,children:`Completed Today`}),(0,s.jsx)(`div`,{className:`kv`,children:`142`})]})]}),(0,s.jsxs)(`div`,{className:`order-ticket`,children:[(0,s.jsxs)(`div`,{className:`ot-top`,children:[(0,s.jsx)(`span`,{children:`ORDER #0149`}),(0,s.jsx)(`span`,{children:`Table / Delivery`})]}),(0,s.jsxs)(`div`,{className:`ot-item`,children:[(0,s.jsx)(`span`,{children:`1x Beef Seekh Kabab`}),(0,s.jsx)(`span`,{children:`Rs 950`})]}),(0,s.jsxs)(`div`,{className:`ot-item`,children:[(0,s.jsx)(`span`,{children:`2x Naan`}),(0,s.jsx)(`span`,{children:`Rs 120`})]}),(0,s.jsxs)(`div`,{className:`ot-item`,children:[(0,s.jsx)(`span`,{children:`1x Mint Margarita`}),(0,s.jsx)(`span`,{children:`Rs 250`})]})]}),(0,s.jsxs)(`div`,{className:`order-ticket`,style:{marginTop:`10px`,opacity:.6},children:[(0,s.jsxs)(`div`,{className:`ot-top`,children:[(0,s.jsx)(`span`,{children:`ORDER #0148`}),(0,s.jsx)(`span`,{style:{color:`var(--green)`},children:`Ready ✓`})]}),(0,s.jsxs)(`div`,{className:`ot-item`,children:[(0,s.jsx)(`span`,{children:`1x Chicken Karahi Full`}),(0,s.jsx)(`span`,{children:`Rs 2,150`})]})]})]})]})}),(0,s.jsx)(`section`,{className:`calc-section`,id:`calculator`,children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsxs)(`div`,{className:`calc-head`,children:[(0,s.jsx)(`div`,{className:`eyebrow on-dark`,children:`See Your Own Numbers`}),(0,s.jsx)(`h2`,{children:`How Much Are Delivery Apps Costing You?`}),(0,s.jsx)(`p`,{children:`Move the sliders to match your restaurant. Watch what stays in your pocket instead of theirs.`})]}),(0,s.jsxs)(`div`,{className:`calc-box`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`slider-group`,children:[(0,s.jsxs)(`div`,{className:`slider-label`,children:[(0,s.jsx)(`span`,{children:`Orders per day`}),(0,s.jsx)(`span`,{className:`val`,children:c})]}),(0,s.jsx)(`input`,{type:`range`,min:`5`,max:`300`,value:c,onChange:e=>l(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`slider-group`,children:[(0,s.jsxs)(`div`,{className:`slider-label`,children:[(0,s.jsx)(`span`,{children:`Average order value (Rs)`}),(0,s.jsx)(`span`,{className:`val`,children:u.toLocaleString(`en-IN`)})]}),(0,s.jsx)(`input`,{type:`range`,min:`300`,max:`5000`,step:`50`,value:u,onChange:e=>d(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`slider-group`,children:[(0,s.jsxs)(`div`,{className:`slider-label`,children:[(0,s.jsx)(`span`,{children:`Current aggregator commission`}),(0,s.jsxs)(`span`,{className:`val`,children:[f,`%`]})]}),(0,s.jsx)(`input`,{type:`range`,min:`10`,max:`35`,value:f,onChange:e=>p(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`bars`,children:[(0,s.jsxs)(`div`,{className:`bar-col aggregator`,children:[(0,s.jsx)(`div`,{className:`bv`,children:m(g)}),(0,s.jsx)(`div`,{className:`bar`,style:{height:C}}),(0,s.jsx)(`div`,{className:`bl`,children:`Lost to Delivery Apps / yr`})]}),(0,s.jsxs)(`div`,{className:`bar-col tarka`,children:[(0,s.jsx)(`div`,{className:`bv`,children:m(x)}),(0,s.jsx)(`div`,{className:`bar`,style:{height:w}}),(0,s.jsxs)(`div`,{className:`bl`,children:[`Kept With `,a,` / yr`]})]})]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`result-card`,children:[(0,s.jsx)(`div`,{className:`rl`,children:`Estimated Additional Profit / Year`}),(0,s.jsx)(`div`,{className:`rv`,children:m(Math.max(b,0))})]}),(0,s.jsxs)(`div`,{className:`breakdown`,children:[(0,s.jsxs)(`div`,{className:`bd-row`,children:[(0,s.jsx)(`span`,{className:`bl2`,children:`Commission avoided`}),(0,s.jsx)(`span`,{className:`br2`,children:m(g)})]}),(0,s.jsxs)(`div`,{className:`bd-row`,children:[(0,s.jsx)(`span`,{className:`bl2`,children:`Staff hours saved (est.)`}),(0,s.jsx)(`span`,{className:`br2`,children:m(_)})]}),(0,s.jsxs)(`div`,{className:`bd-row`,children:[(0,s.jsx)(`span`,{className:`bl2`,children:`Recovered missed orders`}),(0,s.jsx)(`span`,{className:`br2`,children:m(v)})]}),(0,s.jsxs)(`div`,{className:`bd-row`,style:{borderBottom:`none`},children:[(0,s.jsxs)(`span`,{className:`bl2`,children:[a,` flat fee`]}),(0,s.jsx)(`span`,{className:`br2`,style:{color:`var(--amber)`},children:`− Rs 4,999 / mo`})]})]})]})]}),(0,s.jsx)(`div`,{className:`calc-footnote`,children:`That's often enough to hire another employee — or fund your next branch.`})]})}),(0,s.jsx)(`section`,{id:`how`,children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsxs)(`div`,{className:`section-head center`,children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`How It Works`}),(0,s.jsx)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,36px)`},children:`From "Hello" to Hot Food, in Four Steps`})]}),(0,s.jsxs)(`div`,{className:`steps`,children:[(0,s.jsxs)(`div`,{className:`step`,children:[(0,s.jsx)(`div`,{className:`sn`,children:`STEP 1`}),(0,s.jsx)(`div`,{className:`si`,style:{fontWeight:`800`,color:`var(--green-dark)`,fontSize:`18px`},children:`01`}),(0,s.jsx)(`h4`,{children:`Customer Messages`}),(0,s.jsx)(`p`,{children:`They text your existing WhatsApp number — no new app to download.`}),(0,s.jsx)(`div`,{className:`step-arrow`,children:`→`})]}),(0,s.jsxs)(`div`,{className:`step`,children:[(0,s.jsx)(`div`,{className:`sn`,children:`STEP 2`}),(0,s.jsx)(`div`,{className:`si`,style:{fontWeight:`800`,color:`var(--orange)`,fontSize:`18px`},children:`02`}),(0,s.jsx)(`h4`,{children:`AI Takes the Order`}),(0,s.jsxs)(`p`,{children:[a,` replies, confirms items, and calculates the total in seconds.`]}),(0,s.jsx)(`div`,{className:`step-arrow`,children:`→`})]}),(0,s.jsxs)(`div`,{className:`step`,children:[(0,s.jsx)(`div`,{className:`sn`,children:`STEP 3`}),(0,s.jsx)(`div`,{className:`si`,style:{fontWeight:`800`,color:`var(--amber)`,fontSize:`18px`},children:`03`}),(0,s.jsx)(`h4`,{children:`Kitchen Gets Notified`}),(0,s.jsx)(`p`,{children:`The order lands on your Kitchen Display instantly, with an audio alert.`}),(0,s.jsx)(`div`,{className:`step-arrow`,children:`→`})]}),(0,s.jsxs)(`div`,{className:`step`,children:[(0,s.jsx)(`div`,{className:`sn`,children:`STEP 4`}),(0,s.jsx)(`div`,{className:`si`,style:{fontWeight:`800`,color:`var(--muted)`,fontSize:`18px`},children:`04`}),(0,s.jsx)(`h4`,{children:`Ready to Serve`}),(0,s.jsx)(`p`,{children:`Marked ready for pickup or handed to your rider — fully tracked.`})]})]})]})}),(0,s.jsx)(`section`,{style:{background:`var(--cream)`},children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsxs)(`div`,{className:`section-head center`,children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`Why Owners Love It`}),(0,s.jsx)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,36px)`},children:`Stop Paying Thousands Every Month in Commissions`}),(0,s.jsx)(`p`,{className:`lede`,children:`Own your customers. Own your data. Own your profits.`})]}),(0,s.jsxs)(`div`,{className:`love-grid`,children:[(0,s.jsxs)(`div`,{className:`love-card`,children:[(0,s.jsx)(`h4`,{children:`Never Miss an Order`}),(0,s.jsx)(`p`,{children:`AI replies within seconds, even during your busiest rush hour.`})]}),(0,s.jsxs)(`div`,{className:`love-card`,children:[(0,s.jsx)(`h4`,{children:`Available 24/7`}),(0,s.jsx)(`p`,{children:`Customers can order even after your staff has gone home.`})]}),(0,s.jsxs)(`div`,{className:`love-card`,children:[(0,s.jsx)(`h4`,{children:`Fewer Mistakes`}),(0,s.jsx)(`p`,{children:`Orders go straight to the kitchen — no mishearing, no lost notes.`})]}),(0,s.jsxs)(`div`,{className:`love-card`,children:[(0,s.jsx)(`h4`,{children:`Higher Profit`}),(0,s.jsx)(`p`,{children:`Keep every rupee from every order placed directly with you.`})]}),(0,s.jsxs)(`div`,{className:`love-card`,children:[(0,s.jsx)(`h4`,{children:`Customer Database`}),(0,s.jsx)(`p`,{children:`Own your customer list forever — no aggregator standing in between.`})]}),(0,s.jsxs)(`div`,{className:`love-card`,children:[(0,s.jsx)(`h4`,{children:`Better Reviews`}),(0,s.jsx)(`p`,{children:`Faster replies and accurate orders mean happier, returning customers.`})]})]})]})}),(0,s.jsx)(`section`,{className:`feat-grid-wrap`,id:`features`,children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsxs)(`div`,{className:`section-head center`,children:[(0,s.jsx)(`div`,{className:`eyebrow on-dark`,children:`Built for Scale`}),(0,s.jsx)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,36px)`},children:`Everything Your Restaurant Needs, on Autopilot`})]}),(0,s.jsxs)(`div`,{className:`fgrid`,children:[(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`AI WhatsApp Ordering`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Kitchen Display System`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Roman Urdu Support`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`English Support`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Voice Note Ordering`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Live Order Tracking`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Real-Time Dashboard`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Sales Analytics`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Broadcast Campaigns`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Customer CRM`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`QR Code Menu`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Online Payments`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Cash on Delivery`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Staff Role Permissions`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Multiple Branches`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Coupons & Discounts`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Menu Builder`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Automated Reports`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Inventory (Coming Soon)`]}),(0,s.jsxs)(`div`,{className:`fchip`,children:[(0,s.jsx)(`span`,{className:`fdot`}),`Cloud Hosted`]})]})]})}),(0,s.jsx)(`section`,{id:`demo`,children:(0,s.jsxs)(`div`,{className:`wrap demo-grid`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`Try It Yourself`}),(0,s.jsxs)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,34px)`,marginBottom:`16px`},children:[`See `,a,` Handle a Real Order`]}),(0,s.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`16px`,marginBottom:`28px`},children:`Tap an option below and watch the conversation update, exactly like your customers would experience it.`}),(0,s.jsxs)(`div`,{className:`demo-buttons`,children:[(0,s.jsx)(`button`,{className:`demo-btn ${k===`order`?`active`:``}`,onClick:()=>A(`order`),children:`Order Food`}),(0,s.jsx)(`button`,{className:`demo-btn ${k===`table`?`active`:``}`,onClick:()=>A(`table`),children:`Reserve a Table`}),(0,s.jsx)(`button`,{className:`demo-btn ${k===`menu`?`active`:``}`,onClick:()=>A(`menu`),children:`Ask for Menu`}),(0,s.jsx)(`button`,{className:`demo-btn ${k===`track`?`active`:``}`,onClick:()=>A(`track`),children:`Track My Order`})]})]}),(0,s.jsx)(`div`,{className:`demo-phone`,children:(0,s.jsx)(`div`,{className:`phone`,style:{width:`280px`},children:(0,s.jsxs)(`div`,{className:`phone-screen`,style:{height:`420px`},children:[(0,s.jsxs)(`div`,{className:`phone-bar`,children:[(0,s.jsx)(`div`,{className:`dot`,children:`D`}),` Demo Chat`]}),(0,s.jsx)(`div`,{className:`phone-chat`,children:j[k].map((e,t)=>(0,s.jsxs)(`div`,{className:`bubble ${e.who===`in`?`in`:`out`}`,style:{animationDelay:`${t*.35}s`},children:[(0,s.jsx)(`b`,{children:e.name}),e.text]},t))})]})})})]})}),(0,s.jsx)(`section`,{style:{background:`var(--cream)`},children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsxs)(`div`,{className:`section-head center`,children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`Real Restaurants`}),(0,s.jsx)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,36px)`},children:`Owners Are Already Seeing the Difference`})]}),(0,s.jsxs)(`div`,{className:`test-grid`,children:[(0,s.jsxs)(`div`,{className:`test-card`,children:[(0,s.jsxs)(`div`,{className:`test-top`,children:[(0,s.jsx)(`div`,{className:`avatar`,style:{background:`var(--green)`},children:`AK`}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`test-name`,children:`Cloud Kitchen Owner`}),(0,s.jsx)(`div`,{className:`test-loc`,children:`Lahore`})]})]}),(0,s.jsx)(`p`,{className:`test-quote`,children:`"We stopped juggling three delivery app tablets. Now every WhatsApp order lands straight on our kitchen screen — no more mix-ups during rush hour."`}),(0,s.jsx)(`div`,{className:`test-metric`,children:`↑ 100% direct orders kept`})]}),(0,s.jsxs)(`div`,{className:`test-card`,children:[(0,s.jsxs)(`div`,{className:`test-top`,children:[(0,s.jsx)(`div`,{className:`avatar`,style:{background:`var(--orange)`},children:`RH`}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`test-name`,children:`Dhaba Owner`}),(0,s.jsx)(`div`,{className:`test-loc`,children:`Islamabad`})]})]}),(0,s.jsx)(`p`,{className:`test-quote`,children:`"Roman Urdu support was the deciding factor. Our regular customers just text the way they always have, and it understands them perfectly."`}),(0,s.jsx)(`div`,{className:`test-metric`,children:`↓ 30% fewer wrong orders`})]}),(0,s.jsxs)(`div`,{className:`test-card`,children:[(0,s.jsxs)(`div`,{className:`test-top`,children:[(0,s.jsx)(`div`,{className:`avatar`,style:{background:`var(--amber)`,color:`var(--ink)`},children:`SF`}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`test-name`,children:`Home Chef`}),(0,s.jsx)(`div`,{className:`test-loc`,children:`Karachi`})]})]}),(0,s.jsxs)(`p`,{className:`test-quote`,children:[`"I run this solo. `,a,` replies while I'm cooking, so I never lose an order because I couldn't get to my phone in time."`]}),(0,s.jsx)(`div`,{className:`test-metric`,children:`↑ 24/7 order coverage`})]})]})]})}),(0,s.jsx)(`section`,{id:`pricing`,children:(0,s.jsxs)(`div`,{className:`wrap center`,children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`Simple Pricing`}),(0,s.jsx)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,36px)`},children:`One Flat Fee. Zero Commission. Ever.`}),(0,s.jsxs)(`div`,{className:`price-wrap`,children:[(0,s.jsxs)(`div`,{style:{fontWeight:`700`,color:`var(--muted)`,fontSize:`14px`,textTransform:`uppercase`,letterSpacing:`.05em`},children:[a,` Standard`]}),(0,s.jsxs)(`div`,{className:`pv`,children:[`Rs 4,999`,(0,s.jsx)(`span`,{children:`/month`})]}),(0,s.jsxs)(`ul`,{className:`price-list`,children:[(0,s.jsx)(`li`,{children:`Unlimited WhatsApp orders`}),(0,s.jsx)(`li`,{children:`English + Roman Urdu AI agent`}),(0,s.jsx)(`li`,{children:`Live Kitchen Display System`}),(0,s.jsx)(`li`,{children:`Real-time dashboard & analytics`}),(0,s.jsx)(`li`,{children:`Customer database, fully yours`}),(0,s.jsx)(`li`,{children:`Setup & onboarding included`})]}),(0,s.jsx)(i,{href:route(`register`),className:`btn btn-primary`,style:{width:`100%`},children:`Start Your 14-Day Free Trial`})]})]})}),(0,s.jsx)(`section`,{id:`faq`,style:{background:`var(--cream)`},children:(0,s.jsxs)(`div`,{className:`wrap`,style:{maxWidth:`840px`},children:[(0,s.jsxs)(`div`,{className:`section-head center`,children:[(0,s.jsx)(`div`,{className:`eyebrow`,children:`FAQ`}),(0,s.jsx)(`h2`,{style:{fontSize:`clamp(26px,3.2vw,34px)`},children:`Questions Restaurant Owners Ask`})]}),(0,s.jsx)(`div`,{id:`faqList`,children:O.map((e,t)=>(0,s.jsxs)(`div`,{className:`faq-item ${T===t?`open`:``}`,children:[(0,s.jsxs)(`div`,{className:`faq-q`,onClick:()=>D(t),children:[(0,s.jsx)(`span`,{children:e.q}),(0,s.jsx)(`span`,{className:`plus`,style:{transform:T===t?`rotate(45deg)`:`none`},children:`+`})]}),(0,s.jsx)(`div`,{className:`faq-a`,style:{maxHeight:T===t?`500px`:`0`},children:(0,s.jsx)(`p`,{children:e.a})})]},t))})]})}),(0,s.jsx)(`section`,{className:`final-cta`,id:`trial`,children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsx)(`h2`,{children:`Your Restaurant Deserves Better Than Missed Messages and High Commissions.`}),(0,s.jsx)(`p`,{children:`Start accepting direct WhatsApp orders in under 15 minutes.`}),(0,s.jsx)(i,{href:route(`register`),className:`btn btn-light`,children:`Start Free Trial — No Credit Card`})]})}),(0,s.jsx)(`footer`,{children:(0,s.jsxs)(`div`,{className:`wrap`,children:[(0,s.jsxs)(`div`,{className:`foot-grid`,children:[(0,s.jsxs)(`div`,{className:`foot-col`,children:[(0,s.jsxs)(`div`,{className:`logo`,style:{color:`#fff`},children:[(0,s.jsx)(`div`,{className:`logo-mark`,children:`H`}),a]}),(0,s.jsx)(`p`,{style:{marginTop:`12px`,maxWidth:`220px`,color:`rgba(255,255,255,.5)`},children:`The zero-latency restaurant OS for WhatsApp ordering.`})]}),(0,s.jsxs)(`div`,{className:`foot-col`,children:[(0,s.jsx)(`h5`,{children:`Product`}),(0,s.jsx)(`a`,{href:`#how`,children:`How it Works`}),(0,s.jsx)(`a`,{href:`#calculator`,children:`Savings Calculator`}),(0,s.jsx)(`a`,{href:`#features`,children:`Features`}),(0,s.jsx)(`a`,{href:`#pricing`,children:`Pricing`})]}),(0,s.jsxs)(`div`,{className:`foot-col`,children:[(0,s.jsx)(`h5`,{children:`Company`}),(0,s.jsx)(`a`,{href:`#`,children:`About`}),(0,s.jsx)(`a`,{href:`#`,children:`Partner with Us`}),(0,s.jsx)(`a`,{href:`#faq`,children:`FAQ`}),(0,s.jsx)(`a`,{href:`#`,children:`Contact`})]}),(0,s.jsxs)(`div`,{className:`foot-col`,children:[(0,s.jsx)(`h5`,{children:`Get Started`}),(0,s.jsx)(`a`,{href:`#trial`,children:`Start Free Trial`}),(0,s.jsx)(i,{href:route(`login`),children:`Login`})]})]}),(0,s.jsxs)(`div`,{className:`foot-bottom`,children:[(0,s.jsxs)(`span`,{children:[`© `,new Date().getFullYear(),` `,a,`. All rights reserved.`]}),(0,s.jsx)(`span`,{children:`Made for restaurants across Pakistan.`})]})]})})]})}export{c as default};