# System Architecture

## Overview
Bracemen Bot is a multi-tenant SaaS Restaurant Operating System. It allows restaurants to accept orders via a WhatsApp Bot, manage their menus, and view orders on a KDS (Kitchen Display System).

## Core Technologies
- **Framework**: Laravel 13
- **Frontend**: React 18 with Inertia.js v2, Tailwind CSS v3
- **Multi-Tenancy**: `stancl/tenancy` using single-database multi-tenancy mapped with `tenant_id` global scopes for tenant isolation.
- **Messaging**: Meta WhatsApp Cloud API & Evolution API (Baileys/WA-Web-JS provider)
- **WebSockets**: Laravel Reverb

## Architecture Principles
1. **PWA-WhatsApp Decoupling**: WhatsApp acts purely as a customer identifier, inbound gateway, and re-engagement channel. The transaction itself (menu catalog, cart, variants, checkout) occurs on a fast, lightweight mobile customer PWA. This minimizes WABA complexity.
2. **Single Global Webhook**: All WhatsApp messages hit single global webhook endpoints (e.g. `/api/bot/whatsapp/webhook` for Meta or `/api/bot/whatsapp/evolution/webhook` for Evolution). The system parses instance info or phone parameters to route the message to the correct tenant context.
3. **Secure Opaque Credentials**: Customer phone numbers are never exposed in browser URLs. Bot entrypoints generate encrypted 15-minute URL-safe tokens which are exchanged on PWA entry for secure `HttpOnly` sessions, followed by a clean `302 Redirect`.
4. **Draft/Published Setting Configurations**: Tenant-specific parameters ( branding, theme colors, minimum orders, delivery fees, WhatsApp message templates) are managed in a two-stage draft/published database configuration layer with real-time staff live-previews.
5. **Central SaaS Admin (Platform Administration / Tenant Management)**: Accessed via lowercase `/admin/*` routes under the `IsSuperAdmin` middleware. The central platform manager operates in a non-tenant global database context to monitor system metrics, configure global branding constants, manage tenant lifecycle (ban/activate/delete), and generate fixed-rate or sales-commission subscription invoices.

## Deployment & Environments
- **Local Tunnel**: Uses Cloudflare Tunnels to route incoming gateway webhooks to the local development environment.
- **Production VPS Stack**: Deployed via Portainer orchestrating a `docker-compose.yml` stack. The stack uses a multi-stage Docker build producing a custom `webdevops/php-nginx:8.3-alpine` image to serve the Laravel App. It incorporates companion containers for Postgres (Database), Redis (Cache & Queues), a Background Worker (`queue:work`), a Cron Job Scheduler (`schedule:run`), and a `cloudflared` tunnel for secure web traffic ingress.
- **Pre-compiled Assets Pipeline**: Assets are compiled on the local development machine during builds and copied into the final image, reducing VPS resource usage to 0MB during container stack deployments.
