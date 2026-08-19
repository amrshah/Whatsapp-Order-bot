# System Architecture

## 1. Core Technical Stack
- **Backend Framework**: Laravel 13 (Modular Monolith / DDD)
- **Frontend Engine**: Inertia.js v2 + React 18 + TailwindCSS v3
- **Client Mini-App (Ordering)**: Progressive Web App (PWA) with offline-ready service worker & responsive mobile-first UI
- **Database**: PostgreSQL 16 (Tenant-scoped isolation via `stancl/tenancy`)
- **Cache / Session / Queue**: Redis 7 + Laravel Horizon
- **Real-Time WebSockets**: Laravel Reverb (Pushing instant order updates & audio chimes to KDS)
- **WhatsApp Gateway**: Evolution API (Baileys connector) + Meta Cloud API abstraction
- **Infrastructure**: Docker Compose Stack (`app`, `worker`, `cron`, `reverb`, `db`, `redis`)

---

## 2. PWA Mini-App + WhatsApp Gateway Pattern

The platform decouples **traffic acquisition & notification** from the **commerce transaction layer**:

```text
                 CUSTOMER
                    │
              "Hi" on WhatsApp
                    │
                    ▼
          WhatsApp Gateway (Evolution API)
                    │
                    ▼
         "Order from ABC Pizza 👇 [Signed Link]"
                    │
                    ▼
        ┌─────────────────────────┐
        │ Tenant PWA Mini-App     │
        │                         │
        │ 🍕 Interactive Visual Menu
        │ 🏷️ Variants, Sizes & Modifiers
        │ 🛒 Persistent Cart      │
        │ 📍 Map & Delivery Address
        │ 💳 Cash on Delivery / Online
        │ 📦 Live Status Tracking │
        └────────────┬────────────┘
                     │
                     ▼
          Laravel Multi-Tenant APIs (`/api/pwa/*`)
                     │
            ┌────────┼────────┐
            ▼        ▼        ▼
          CRM     Orders   Unified KDS / POS (Reverb)
                     │
                     ▼
          WhatsApp Transactional
          Milestone Alerts
```

### Architectural Roles:
1. **WhatsApp as Gateway**: Greets customer, authenticates phone identity with short-lived cryptographic signed URL, and delivers order milestone alerts.
2. **PWA as Commerce Engine**: Delivers a rich, app-like ordering experience with zero installation barriers.
3. **Laravel Multi-Tenant Core**: Centralized state management, CRM profile capture, order lifecycle dispatching, and Kitchen Display synchronization.

