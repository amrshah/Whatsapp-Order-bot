# System Architecture

## Overview
OrmEasy OS is a multi-tenant SaaS Business Operating System supporting both commerce verticals (Restaurants, Retail) and appointment/service verticals (Clinics, Salons, Law Firms, Workshops). It allows businesses to accept direct orders and bookings via a fast PWA Mini-App connected to an inbound WhatsApp Gateway, manage services/menus, and track orders & appointments in real-time.

## Core Technologies
- **Framework**: Laravel 13
- **Frontend**: React 18 with Inertia.js v2, Tailwind CSS v3
- **Multi-Tenancy**: `stancl/tenancy` using single-database multi-tenancy mapped with `tenant_id` global scopes for tenant isolation.
- **Messaging**: Meta WhatsApp Cloud API & Evolution API (Baileys/WA-Web-JS provider)
- **WebSockets**: Laravel Reverb
- **Testing Engine**: Pest PHP 4

## Architecture Principles
1. **Multi-Vertical Capability Engine**: Tenants are governed by active granular capabilities (`catalog`, `ordering`, `kds`, `delivery`, `services`, `booking`, `staff`, `payments`). Routes, frontend menus, and API mutations enforce capability requirements (`capability:{cap}`).
2. **PWA Experience Resolution & Graceful Degradation**: PWA Mini-App shell dynamically resolves the primary experience (`order`, `book`, or fallback contact hub) according to active capabilities. Requests for unassigned experiences (e.g. clinic hitting `/order`) 302 redirect to the tenant's primary experience (`/book`), while mutation endpoints (e.g. `/checkout`) return 403 Forbidden.
3. **PWA-WhatsApp Decoupling**: WhatsApp acts purely as a customer identifier, inbound gateway, and re-engagement channel. The transaction itself (menu/service catalog, booking/checkout) occurs on a fast, lightweight mobile customer PWA.
4. **Single Global Webhook**: All WhatsApp messages hit single global webhook endpoints (e.g. `/api/bot/whatsapp/webhook` for Meta or `/api/bot/whatsapp/evolution/webhook` for Evolution). The system parses instance info or phone parameters to route the message to the correct tenant context.
5. **Secure Opaque Credentials**: Customer phone numbers are never exposed in browser URLs. Bot entrypoints generate encrypted 15-minute URL-safe tokens which are exchanged on PWA entry for secure `HttpOnly` sessions, followed by a clean `302 Redirect`.
6. **WhatsApp Bot Workflow Builder**: Schema-driven `WorkflowExecutionEngine` inside `Modules/Bot` interprets dynamic workflow nodes (`trigger`, `message`, `catalog_menu`, `pwa_link`, `system_action`) configured via `/admin/bot-workflows` with live bubble previews.
7. **Merchant ROI Engine & 10-Minute Launch Stepper**: Real-time commercial analytics (`MerchantRoiService`) tracking direct revenue, AOV, repeat retention %, and aggregator commission savings with an interactive launch checklist.
8. **Central SaaS Admin (Platform Administration / Tenant Management)**: Accessed via lowercase `/admin/*` routes under the `IsSuperAdmin` middleware. The central platform manager operates in a non-tenant global database context to monitor system metrics, configure global branding constants, manage tenant lifecycle (ban/activate/delete), and configure tenant capabilities via a dedicated Capabilities tab.

## Deployment & Environments
- **Local Tunnel**: Uses Cloudflare Tunnels to route incoming gateway webhooks to the local development environment.
- **Production VPS Stack**: Deployed via Portainer orchestrating a `docker-compose.yml` stack (`webdevops/php-nginx:8.3-alpine`). Includes companion containers for Postgres (Database), Redis (Cache & Queues), Background Worker (`queue:work`), Cron Job Scheduler (`schedule:run`), and `cloudflared` tunnel.
- **Pre-compiled Assets Pipeline**: Assets are compiled on the local development machine during builds and copied into the final image, reducing VPS resource usage to 0MB during container stack deployments.
