# System Architecture

## Overview
Bracemen Bot is a multi-tenant SaaS Restaurant Operating System. It allows restaurants to accept orders via a WhatsApp Bot, manage their menus, and view orders on a KDS (Kitchen Display System). 

## Core Technologies
- **Framework**: Laravel 13
- **Frontend**: React 18 with Inertia.js v2, Tailwind CSS
- **Multi-Tenancy**: stancl/tenancy (Database per tenant or single DB with tenant scopes; currently configured for isolation).
- **Messaging**: Meta WhatsApp Cloud API

## Architecture Principles
1. **Single Global Webhook**: All WhatsApp messages from all tenants hit a single global webhook endpoint (/api/bot/whatsapp/webhook). The system parses the wa_phone_number_id to route the message to the correct tenant context.
2. **Tenant Isolation**: Each tenant has their own configurations, menu items, orders, and integration settings (wa_phone_number_id, wa_access_token).
3. **State Machine Bot**: The bot interactions are managed via handlers and a state machine to navigate the user through the menu, cart, and checkout.

## Integrations
- **Meta WhatsApp API**: Uses the Cloud API. The platform has a single Meta App. The SaaS admin configures the global webhook. Tenants provide their own wa_phone_number_id and Permanent Access Token (via the Dashboard Settings > Integrations page).
- Future phase: Meta Embedded Signup (WhatsApp Login for Business) to automate token retrieval.

## Deployment & Environments
- **Local Tunnel**: Uses Cloudflare Tunnels (e.g., silver-stable.samwebdevs.dpdns.org) to route Meta webhooks to the local Docker/serve environment.
