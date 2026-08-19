# ADR-0007: PWA Mini-App with WhatsApp Conversational Gateway

## Status
**Accepted**

## Context
The initial architecture treated WhatsApp as the entire application runtime. Complex multi-step interactions (browsing categories, configuring item modifiers, managing cart state, inputting delivery addresses, and confirming orders) occurred via conversational state handlers. 

While functional, this approach introduced significant pain points:
1. **Protocol Limitations**: WhatsApp Web (Baileys) connectors in third-party engines (like Evolution API) exhibit instability and incompatibility with interactive buttons and lists, requiring plain-text fallback numbering.
2. **UX Restrictions**: WhatsApp chat cannot match the fidelity of native web UI for visual food browsing, product variant selections, modifier add-ons, and map-based pin dropping.
3. **Message Volume & Ban Risk**: A single order generated 10–20 back-and-forth messages over WhatsApp, increasing outbound bandwidth, processing overhead, and number ban risk.
4. **WABA Friction**: WhatsApp Business API (WABA) onboarding via Meta Embedded Signup adds overhead for non-technical small restaurant owners.

## Decision
We decouple **customer acquisition and notifications** from the **ordering commerce interface**:
- **WhatsApp (Evolution API / Meta)** acts strictly as the **Conversational Gateway & Notification Transport**. When a customer messages "Hi", the bot replies with a branded, secure deep link to the tenant's ordering PWA.
- **PWA Mini-App** acts as the **Commerce Engine**. A lightweight, ultra-fast, mobile-first Web / PWA interface provides full visual menus, product variants/deals, real-time cart, location selection, and instant checkout.
- **Order Notifications**: Once an order is placed via the PWA, background event listeners trigger transactional notifications over WhatsApp (Order Received, Preparing, Out for Delivery, Delivered).

```text
                 CUSTOMER
                    │
              "Hi" on WhatsApp
                    │
                    ▼
             Evolution API (Gateway)
                    │
                    ▼
         "Order here 👇 [Signed Link]"
                    │
                    ▼
        ┌─────────────────────────┐
        │ Tenant PWA Mini-App     │
        │                         │
        │ 🍕 Visual Menu          │
        │ 🏷️ Variants & Modifiers  │
        │ 🛒 Interactive Cart     │
        │ 📍 Map/Address Picker   │
        │ 💳 COD / Online Pay     │
        │ 📦 Real-Time Tracking   │
        └────────────┬────────────┘
                     │
                     ▼
          Laravel Multi-Tenant APIs
                     │
            ┌────────┼────────┐
            ▼        ▼        ▼
          CRM     Orders   Unified KDS / POS
                     │
                     ▼
          Transactional WhatsApp
          Status Notifications
```

## Consequences

### Positive
- **Unlimited UI/UX Fidelity**: Rich images, item options, category tabs, and search without chat UI constraints.
- **Dramatically Reduced Ban Risk & Latency**: WhatsApp message exchanges per order drop from 15+ messages to 1–3 transactional pings.
- **Zero-Install Friction**: Operates instantly in the customer's mobile browser upon link tap, with optional PWA home-screen installability.
- **Multi-Vertical Extensibility**: The exact same gateway + mini-app engine generalizes seamlessly to Doctors (Appointments), Salons (Booking), and Professional Services.
- **Full Backend Continuity**: Direct integration into existing Stancl Tenancy, CRM customer capture, Order models, and Reverb KDS feeds.

### Negative / Tradeoffs
- Requires maintaining client-facing PWA routes alongside admin/tenant Inertia dashboard pages.
- Requires secure, signed URL tokens to preserve customer phone identity from WhatsApp into the PWA session without friction.

## Security & Session Invariants
1. **Identity Linking**: Incoming WhatsApp triggers generate a short-lived signed token or session associating `phone_number` and `tenant_id`. Sensitive credentials must never be exposed as raw URL query parameters.
2. **Tenant Isolation**: All public PWA API endpoints (`/api/pwa/...` or Inertia routes) must execute inside initialized tenancy context (`tenancy()->initialize($tenant)`).
3. **PWA Standalone Mode**: Customers accessing the PWA directly or via re-orders can input/verify their phone number seamlessly.
