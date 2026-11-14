# OrmEasy Restaurant OS — Product Gap Analysis

**Date:** 2026-11-14  
**Planning baseline:** NRM v2.5.0 reconnaissance compared with the current OrmEasy repository.

## 1. Product priority — agreed

### Priority 1: Quick revenue from small food businesses

Target small pizza shops, cloud kitchens, takeaway outlets and small restaurants. The product must be easy to understand, inexpensive to adopt and useful quickly through affordable monthly subscriptions.

The core proposition is:

> In approximately ten minutes, a merchant should be able to publish a branded customer mini-app, connect WhatsApp, configure a basic menu and process the first test order through POS/KDS.

The ten-minute onboarding promise applies to minimum viable launch, not every advanced configuration.

### Priority 2: Medium-to-full restaurant operations

After the first segment is selling and retaining, expand the same product into dine-in and full restaurant workflows: tables, waiters, reservations, advanced kitchen operations, payments, delivery dispatch, inventory, finance, staff and management reporting.

### Explicit exclusion: car rental

Car rental is not part of OrmEasy's restaurant roadmap. Keep its product, domain entities, UX, workflows and roadmap separate. Reuse generic infrastructure only where it is genuinely clean and does not contaminate restaurant domain boundaries.

## 2. Product positioning

OrmEasy is not merely a WhatsApp bot. It is a restaurant operating platform whose acquisition and customer communication channels include WhatsApp, QR codes and direct PWA links.

Near-term differentiators:
- Tenant-branded customer PWA.
- WhatsApp gateway and transactional updates.
- Fast merchant onboarding.
- Shared order pipeline for PWA and manual POS.
- KDS with realtime updates.
- Simple delivery/takeaway operations.
- Low-friction subscription for small merchants.

Do not compete on feature count. Compete on activation speed, direct-order economics, ease of use and dependable order fulfilment.

## 3. Current implementation baseline

This is based on targeted inspection of the current repository's capability registry, PWA routes/controllers, onboarding and architecture documentation, Orders/Menu/Bot/CRM modules, POS UI/controller and selected feature tests. It is not a full test run or a claim that every workflow is production-ready.

| Area | Current status | Gap / interpretation |
|---|---|---|
| Multi-tenant SaaS | Foundation implemented | Keep tenant isolation enforced on every read and write. |
| 10-minute onboarding | Foundation implemented | Validate with actual merchants; measure time to published menu and first successful order. |
| Branded PWA | Implemented foundation | Existing tenant mini-app, branding/settings, manifest and ordering experience. |
| WhatsApp | Implemented foundation | Evolution and Meta Cloud provider paths, webhooks, workflow engine and notifications exist; operational reliability still needs validation. |
| CRM | Implemented foundation | Customer identity, addresses and order metrics exist. CRM is shared infrastructure, not a restaurant-only feature toggle. |
| Catalog | Partial | Basic categories/products exist; the inspected Product model does not establish full restaurant variants/modifier groups/recipe costing. |
| PWA ordering | Implemented foundation | Checkout and tracking paths exist with feature tests; harden retries, price validation and exception handling. |
| POS | Partial | Current manual POS is primarily product selection, cart and order creation. It is not yet a complete cashier settlement workflow. |
| KDS | Partial | Unified KDS and realtime order events exist. Multi-station routing, prep timers, recall/hold and expo are not established. |
| Delivery | Partial/foundation | Capability and tracking concepts exist; complete dispatch, rider assignment/app, exceptions and cash/fee reconciliation are not established. |
| Table operations | Partial/foundation | Table number is present on orders; no complete floor plan, table lifecycle, waiter assignment or table settlement was established. |
| Restaurant reservations | Not established | Generic Booking capability/experience is not a table-reservation system. Need capacity/availability, allocation, confirmation and no-show workflows. |
| Payments | Foundation only | Payments capability is declared; a dedicated payment domain/module and settlement ledger were not found in the inspected module set. |
| Inventory/recipes | Foundation only | Inventory capability is declared; complete stock movements, recipes, purchasing and COGS were not established. |
| Finance/reports | Early foundation | ROI/dashboard concepts exist; reliable tender reconciliation, expenses, ledger, P&L and kitchen performance reporting remain future work. |
| Staff workflows | Partial/foundation | Authentication/RBAC foundation exists; role-specific waiter, cashier, chef and rider workflows need product implementation. |

### Critical distinction

Capability declaration, navigation metadata, a model, route, screenshot or test name does not prove a complete feature. Track feature maturity explicitly as declared, scaffolded, partial, implemented, verified and released.

Only mark a workflow verified after an end-to-end test covers its business outcome, permissions, tenant boundary and failure cases.

## 4. NRM findings worth adopting

The NRM audit identified 32 features. The following are the strongest candidates, selected for OrmEasy's target segment and longer-term direction.

| NRM capability | OrmEasy assessment | Product decision |
|---|---|---|
| Touch POS with catalog and ticket | POS partial | Near-term: improve counter speed and order editing. |
| Product sizes and variations | Catalog partial | Near-term P0: pizza sizes with independent pricing. |
| Add-on/modifier engine | Not established as complete | Near-term P0: toppings, crusts, required/optional groups, min/max and price deltas. |
| Order modes: dine-in/takeaway/delivery | Partial | Near-term P0: normalize types and fulfilment rules. |
| KDS lifecycle | Basic states exist | Near-term P0: formal transitions, timestamps, reliable realtime recovery. |
| Combos/deals | Deal model exists | Near-term: validate full bundle pricing, availability and time windows. |
| Delivery/rider dispatch | Partial/foundation | Near-term P1: simple dispatch board and own-rider assignment. |
| Multi-station KDS | Not established | P1: oven/prep/drinks stations for kitchens that need them. |
| Prep timers | Not established | P1 with station KDS. |
| Open/unpaid bills | Not established | P1 with a more complete POS. |
| Visual table floor plan | Not established | Later dine-in release. |
| Table configuration and sections | Not established | Later dine-in release. |
| Waiter ordering app | Not established | Later dine-in release. |
| Multi-round ordering | Not established | Later; not needed for cloud-kitchen launch. |
| Table/KDS synchronization | Realtime foundation exists | Later with table management. |
| Multi-account/split payments | Not established | Later; first build accurate basic settlement. |
| Tip liability separation | Not established | Defer until full-service demand justifies it. |
| Multi-account ledger/expenses | Not established | Later finance domain. |
| Kitchen/sales/P&L reports | Early dashboard only | Later, after source transactions are trustworthy. |
| Customer profiles/history | CRM foundation exists | Improve repeat-order and retention capabilities. |
| Staff RBAC and waiter zones | Foundation/partial | Expand with role-specific workflows. |
| Tax/service charge/receipt settings | Some settings exist | Add configurable and auditable rules as POS matures. |
| Backup/restore and demo data | Not established in reviewed evidence | Platform/admin operations; lower priority than merchant activation. |
| License fingerprinting | Not appropriate for SaaS direction | Use tenant subscriptions and entitlements, not desktop-style license locks. |

## 5. Near-term product backlog themes

### P0 — Commercial reliability
- Canonical order lifecycle and valid transition rules.
- Server-authoritative price and total calculation.
- Tenant-safe validation of products, categories and related records.
- Database transactions for order and line creation.
- Idempotency for checkout/webhook retries and duplicate submissions.
- Order status history and timestamps.
- Correct cancellation, unavailable-item and notification-failure handling.
- KDS reconnect/reload strategy so missed broadcasts do not lose tickets.
- End-to-end tests for PWA and POS orders through KDS and customer notification.

### P0 — Pizza/cloud-kitchen fit
- Product variants and size pricing.
- Modifier groups, toppings, crust choices and price deltas.
- Combo/bundle pricing and validity.
- Sold-out/availability controls.
- Delivery zones, fees, minimum order and prep estimates.
- Merchant onboarding presets for pizza/cloud kitchens.
- Essential sales/order/AOV/channel metrics.

### P1 — Practical POS and settlement
- Order modes and clear dine-in/takeaway/delivery flows.
- Hold/resume/open orders.
- Basic cash and configurable payment methods.
- Receipt printing/sharing and daily cashier summary.
- Discounts, cancellation and void controls with permissions/audit.
- Reconciliation between order total and tender records.

### P1 — Delivery basics
- Delivery queue and dispatch board.
- Rider records and manual assignment/reassignment.
- Assigned/picked-up/en-route/delivered/failed states.
- Customer notifications and delivery outcome.
- Rider mobile web workflow and basic cash/fee reconciliation.

## 6. Medium-to-full restaurant backlog themes

- Table/section configuration and visual floor plan.
- Table checks, waiter app, add-to-existing-order and table settlement.
- Reservations with time slots, capacity control, table allocation, confirmation/reminders and no-show handling.
- Multi-station KDS, item routing, prep timers, bump/recall and expo.
- Payment domain: multiple tenders, split payments, partial settlement, refunds, tips and reconciliation.
- Inventory items, units, recipes/BOMs, stock movements, purchases, wastage and COGS.
- Expenses, ledger, cash/bank accounts, P&L and operational reports.
- Role templates, staff shifts, waiter zones and audit history.
- Multi-branch capabilities only after the single-location workflows are stable.

## 7. Product metrics

Near term:
- Signup-to-published-PWA time.
- Signup-to-first-test-order time.
- Self-service onboarding completion.
- Merchant activation-to-paid conversion.
- Orders per merchant and failed/duplicate order rate.
- Order-to-KDS latency.
- Percentage of orders requiring manual correction.
- Monthly retention and support burden per active merchant.

Expansion:
- POS settlement accuracy and cash variance.
- Kitchen prep time and station bottlenecks.
- Delivery assignment-to-completion time.
- Table turn time and reservation no-show rate.
- Stock variance, wastage and COGS accuracy.

## 8. Non-goals

- Do not clone all NRM features.
- Do not delay first-segment revenue for full ERP/accounting.
- Do not make optional advanced setup part of the ten-minute onboarding path.
- Do not confuse generic booking with restaurant reservations.
- Do not mix car-rental workflows or domain entities into OrmEasy.
- Do not build advanced reporting before orders, payments and stock events are reliable.

See [RESTAURANT_OS_ROADMAP.md](RESTAURANT_OS_ROADMAP.md) for staged release themes and acceptance gates.
