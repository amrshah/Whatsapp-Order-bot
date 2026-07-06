# Product Roadmap & Sprint Planning

This document maps out exactly when each feature from the PRD and AI Blueprint will be implemented.

## Sprint 0: Foundation [COMPLETED]
- Multi-tenancy isolation (`stancl/tenancy`).
- Authentication (Google/Facebook Socialite).
- Role-Based Access Control (Owner, Manager, Staff, Customer).
- Automated Restaurant Onboarding (Tenant auto-creation).

## Sprint 1: Core OS Engine & WhatsApp Ordering MVP [UP NEXT]
*Goal: A restaurant can manually add their menu, and customers can place orders via a structured, button-based WhatsApp flow.*
- **Menu Module**: Database schemas and basic API for Categories, Products, Variants, and Deals.
- **Orders Module**: Database schemas for Orders and Order Items with status tracking (`Pending`, `Preparing`, `Ready`, `Delivered`).
- **Bot Module (Webhook MVP)**: 
  - Twilio/WhatsApp webhook receiver.
  - Interactive Button-Based Flow: Greeting -> Send Menu -> User clicks button to order -> Order saves to DB -> Confirmation receipt sent.

## Sprint 2: AI Conversational Ordering (NLP)
*Goal: Replace the rigid buttons with an autonomous AI agent capable of understanding Roman Urdu and English.*
- **LLM Integration**: OpenAI/Anthropic pipeline to parse raw text (`"2 Zinger Burger, COD delivery"`).
- **Intent Recognition**: Extract order items, modifications (no onions), quantities, and delivery addresses dynamically.
- **Zero-Latency Optimization**: Ensure the LLM processes and replies in under 3 seconds.

## Sprint 3: Kitchen Display System (KDS)
*Goal: Replace physical paper tickets with a digital workflow.*
- **KDS React Frontend**: Multi-column Kanban board (New Orders, Preparing, Ready/Out).
- **Real-Time Sync**: WebSockets (Laravel Reverb or Pusher) to push new WhatsApp orders instantly to the screen.
- **UX Audio Alerts**: Persistent sound ping when a new order drops to alert busy kitchen staff.

## Sprint 4: Unified POS & Dashboard
*Goal: Provide a centralized hub for the restaurant owner.*
- **Omnichannel POS**: Interface to manually punch in Walk-in and Dine-In orders, merging them into the same pipeline as WhatsApp orders.
- **ROI Dashboard**: Analytics showing gross sales, top items, and explicitly highlighting "Saved Commission" vs Foodpanda.

## Sprint 5+: Advanced SaaS Features
- CRM & Marketing (WhatsApp Broadcasts).
- Inventory Management (Recipe deductions).
- Finance & Payroll.
