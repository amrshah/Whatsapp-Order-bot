# Roadmap Status Report

Here is a breakdown of our current progress against the `docs/ROADMAP.md`, including what has been successfully implemented, what is pending, and specifically the items we planned for past/current sprints but haven't built yet.

## Sprint 0: Foundation
**Status: ✅ COMPLETED**
- `[x]` Multi-tenancy isolation (`stancl/tenancy`).
- `[x]` Authentication (Google/Facebook Socialite).
- `[x]` Role-Based Access Control (Spatie is installed and traits are on the User model).
- `[x]` Automated Restaurant Onboarding (Tenant auto-creation).

## Sprint 1: Core OS Engine & WhatsApp Ordering MVP
**Status: 🔄 IN PROGRESS**
- `[x]` **Menu Module**: Categories & Products exist.
- `[x]` **Orders Module**: Database schemas for Orders and Order Items with status tracking.
- `[ ]` **Menu Module (Missed)**: Variants and Deals schemas and APIs have not been implemented.
- `[ ]` **Bot Module (Missed)**: We have a webhook endpoint, but the *Interactive Button-Based Flow* (Greeting -> Send Menu -> User clicks button -> Confirmation) is missing. The current webhook is just a dummy parser that blindly accepts the word "ORDER".

## Sprint 2: AI Conversational Ordering (NLP)
**Status: ⏳ PENDING**
- `[ ]` LLM Integration (OpenAI/Anthropic).
- `[ ]` Intent Recognition.
- `[ ]` Zero-Latency Optimization.

## Sprint 3: Kitchen Display System (KDS)
**Status: 🔄 IN PROGRESS**
- `[x]` **KDS React Frontend**: Multi-column Kanban board built.
- `[ ]` **Real-Time Sync (Missed)**: We are currently using frontend short-polling (refreshing every few seconds) instead of actual WebSockets (Laravel Reverb/Pusher).
- `[ ]` **UX Audio Alerts (Missed)**: No sound ping is currently implemented to alert kitchen staff of new incoming orders.

## Sprint 4: Unified POS & Dashboard
**Status: ✅ COMPLETED**
- `[x]` **Omnichannel POS**: Interface to punch in Walk-in and Dine-In orders, merging them into the same pipeline.
- `[x]` **ROI Dashboard**: Analytics showing metrics and Saved Commission.

## Sprint 5+: Advanced SaaS Features
**Status: 🔄 IN PROGRESS**
- `[x]` **CRM**: Basic database and interface for auto-capturing customers and tracking their metrics.
- `[ ]` **CRM Marketing (Missed)**: WhatsApp Broadcast capabilities are pending.
- `[ ]` Inventory Management (Recipe deductions).
- `[ ]` Finance & Payroll.

---

> [!WARNING]
> ### 🚨 Summary of "Missed" Items from Active/Past Sprints
> 1. **Menu Variants & Deals**: Not yet built in the Menu Module.
> 2. **Interactive WhatsApp Flow**: The actual Twilio/Meta webhook flow sending interactive WhatsApp buttons to users.
> 3. **WebSockets for KDS**: Real-time push events via Laravel Reverb instead of polling.
> 4. **KDS Audio Alerts**: Sound notifications for new orders on the KDS screen.
