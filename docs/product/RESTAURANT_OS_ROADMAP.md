# OrmEasy Restaurant OS — Staged Implementation Roadmap

**Status:** Strategic roadmap baseline  
**Date:** 2026-11-14  
**Prerequisite reading:** [Gap Analysis](RESTAURANT_OS_GAP_ANALYSIS.md)

This is a sequence of product outcomes, not a fixed calendar commitment. Create small implementation issues with acceptance criteria in the source repository when each workstream is scheduled.

> [!NOTE]
> The complete issue breakdown and dependency graph for Stage A0 is tracked in [A0_GITHUB_ISSUES.md](A0_GITHUB_ISSUES.md).

## Stage A — Small pizza shops and cloud kitchens (commercial priority)

### A0. Stabilize order-to-kitchen reliability

**Outcome:** Every valid PWA or POS order is priced correctly, stored once, visible to the kitchen and traceable through fulfilment.

- Define canonical order types, sources and lifecycle transitions.
- Recalculate all prices/totals server-side from trusted catalog data.
- Validate tenant ownership of every referenced product/category/customer.
- Wrap order and order-item creation in transactions.
- Add checkout idempotency and webhook duplicate protection.
- Record status history, actor and timestamps.
- Handle cancellation, unavailable products, failed notifications and retry scenarios.
- Make KDS recover missed realtime broadcasts through authoritative reload.
- Add tenant-isolation, duplicate-submission, concurrent-update and failure-path tests.

**Acceptance gate:** Automated end-to-end scenarios cover PWA and POS order creation, correct total calculation, KDS receipt, status transitions, customer notification and order history. Duplicate/retried requests do not create duplicate orders.

### A1. Pizza-grade catalog and menu

**Outcome:** A pizza merchant can configure a real menu without workarounds.

- Variants/sizes with independent prices.
- Modifier groups with required/optional selection, min/max and included quantities.
- Crust, toppings, extra cheese and item notes.
- Price deltas and deterministic cart/order snapshots.
- Combo/bundle definitions, validity windows and pricing.
- Item availability/sold-out controls.
- Import workflow with preview and merchant confirmation.
- Pizza/cloud-kitchen onboarding presets.

**Acceptance gate:** Configure at least three sizes, modifier groups and a combo; verify identical correct totals in PWA, POS, persisted order and KDS ticket.

### A2. Ten-minute merchant activation

**Outcome:** Merchant can launch a minimum viable branded ordering experience with minimal assistance.

- Guided business profile and branding.
- Menu template/import and fast product creation.
- WhatsApp connection with actionable connection status and troubleshooting.
- Delivery/takeaway settings and opening hours.
- Publish/preview PWA.
- Test-order simulator or guided test order.
- Progress persistence and resumable onboarding.
- Optional features remain deferred and do not block launch.

**Acceptance gate:** Measure at least five representative onboarding sessions; track median time to published PWA and first successful test order. Do not claim ten-minute success until measured.

### A3. Practical small-shop POS

**Outcome:** Counter staff can create and manage walk-in/takeaway/delivery orders without bypassing the shared order domain.

- Fast product search/category browsing and modifier selection.
- Cart editing, quantities, notes and discounts with permissions.
- Hold/resume open orders.
- Basic cash and configurable tender recording.
- Receipt print/share.
- Cancel/void with reason and audit trail.
- Daily cashier totals.
- Same authoritative pricing and KDS path as PWA orders.

**Acceptance gate:** Cashier creates, holds, resumes, settles and cancels orders; daily totals reconcile with persisted payment records.

### A4. Basic own-rider delivery

**Outcome:** A small delivery business can dispatch and close its own deliveries.

- Delivery queue and manual assignment.
- Rider profile and availability.
- Reassignment and exception reasons.
- Assigned, picked-up, en-route, delivered and failed states.
- Customer status notifications.
- Rider mobile web view.
- Delivery fee and cash collection record.

**Acceptance gate:** One order can be dispatched, updated by rider, completed with outcome and reconciled to its delivery/payment records.

### A5. Merchant essentials and subscription readiness

**Outcome:** Owner sees enough value to retain and pay for the service.

- Daily orders, sales, average order value and channel mix.
- Best-selling items and basic repeat-customer measures.
- Merchant activation and usage events.
- Subscription entitlements mapped to real shipped capabilities.
- Clear plan limits and upgrade paths.
- Support/admin view for onboarding and failed integrations.

**Acceptance gate:** Merchant-facing metrics reconcile to underlying orders and the platform can report active, activated and paying merchants.

## Stage B — Medium restaurant operations

### B1. Dine-in tables and waiter workflow

- Sections and tables with capacity and configurable layout.
- Table states: available, occupied, reserved, needs attention.
- Open table checks and association of orders to tables.
- Waiter mobile ordering interface.
- Add items to an existing check.
- Transfer, merge and split tables/checks with audit history.
- KDS-ready status reflected on floor plan.
- Cashier settlement closes the check and releases the table.

**Acceptance gate:** Waiter opens a table, sends first items, adds another round, follows kitchen progress and hands off to cashier; settlement closes the table correctly.

### B2. Restaurant reservations

- Date/time, party size, contact, notes and source.
- Opening hours, service periods, slot duration and booking horizon.
- Capacity calculation and concurrent overbooking prevention.
- Table/section allocation or unassigned queue.
- Confirmation, reminder, cancellation, seated and no-show states.
- Walk-in coordination.
- Optional PWA self-service booking.

**Acceptance gate:** Concurrent booking attempts cannot exceed configured capacity; staff can confirm, assign, seat, cancel and mark no-show.

### B3. Advanced kitchen operations

- Configurable kitchen stations (oven, fryer, grill, prep, bar).
- Product/modifier station routing.
- Split tickets by station.
- Station-specific KDS queues.
- Prep-time presets and countdowns.
- Accepted/preparing/ready lifecycle and timestamps.
- Hold, recall, bump and expo/pass workflow.
- Table/order synchronization and kitchen performance measures.

**Acceptance gate:** Multi-item orders route to the correct stations and can be coordinated to one complete fulfilment without lost or duplicate items.

### B4. Payment settlement and controls

- Dedicated payment domain with payment records separate from orders.
- Tender types and payment allocations.
- Partial and split settlement.
- Refund/void flows with permissions and reasons.
- Cash drawer opening/closing and variance.
- Tips separated from sales where required.
- Tax/service charge and receipt rules.
- Reconciliation and immutable financial audit history.

**Acceptance gate:** Split-tender orders settle and refund correctly; historical order values are not silently rewritten; cashier totals reconcile.

## Stage C — Full restaurant operations

### C1. Inventory and recipe costing
- Stock items, ingredients, units and conversions.
- Recipes/BOMs for products and variants.
- Purchases, receiving, adjustments, transfers and wastage.
- Stock movements triggered at explicit order lifecycle points.
- Stock counts and low-stock alerts.
- Supplier records.
- Recipe costs and gross margin.

**Acceptance gate:** An order generates deterministic stock movements; stock count variance and recipe costing are traceable.

### C2. Finance and management reporting
- Expense vouchers and categories.
- Cash/bank/wallet accounts.
- Ledger and settlement integration.
- Sales, gross margin and P&L.
- Kitchen station/prep performance.
- Reconciliation of orders, payments, expenses and stock valuation.

**Acceptance gate:** Reports reconcile to source transactions and financial changes are auditable.

### C3. Staff and multi-location operations
- Role templates for owner, manager, cashier, waiter, kitchen and rider.
- Shift/attendance and waiter-zone assignment where needed.
- Fine-grained permissions and action audit.
- Multi-location configuration and reporting only after single-location workflows are dependable.

**Acceptance gate:** Role permissions are enforced server-side and multi-location data remains isolated and correctly consolidated.

## Cross-cutting release gates

Every stage must preserve:
- Tenant isolation at every query and mutation boundary.
- Backend capability enforcement; hiding a menu item is not authorization.
- Server-authoritative money calculations and auditable financial changes.
- Idempotent external webhook and checkout processing.
- Accessible, touch-first POS/KDS UX.
- Mobile PWA performance and resilient network recovery.
- Structured logs, queue/webhook monitoring and useful failure diagnostics.
- Automated tests for business logic, tenant boundaries, permissions and retries.
- Documentation and migration discipline.

## Prioritization rule

When capacity is limited, prioritize in this order:
1. Reduces failed orders or merchant support.
2. Helps activate, convert or retain a small pizza/cloud-kitchen merchant.
3. Unlocks a paid subscription capability.
4. Is a dependency for a later restaurant workflow.
5. Is an NRM feature that is genuinely valuable to the target segment.

Do not prioritize a feature solely because a competitor has it.
