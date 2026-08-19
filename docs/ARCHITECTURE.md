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
          [1. UPSERT CRM Customer (Verified WhatsApp Phone)]
          [2. Generate 15-min Opaque Exchange Token]
                    │
                    ▼
         "Order from ABC Pizza 👇 [Signed Link]"
                    │
                    ▼
          Token Exchange Endpoint (/order/{slug}?auth=token)
          [3. Validate & Consume Token -> Set HttpOnly Session]
          [4. 302 Redirect -> Clean URL: /order/{slug}]
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
          [5. Update CRM Customer Profile & LTV]
          [6. Create Order & Broadcast to KDS via Reverb]
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
1. **WhatsApp as Gateway**: Greets customer, immediately captures/upserts the verified WhatsApp phone number in the tenant's CRM database as an active lead, generates a 15-minute opaque exchange token, and delivers automated milestone alerts.
2. **PWA as Commerce Engine**: Consumes exchange token on first load, establishes a secure `HttpOnly` session, and presents a rich visual ordering experience on a clean URL.
3. **Laravel Multi-Tenant Core**: Centralizes "Customer Memory" (identity, addresses, order history, LTV), handles real-time KDS dispatching, and orchestrates transactional WhatsApp updates.

