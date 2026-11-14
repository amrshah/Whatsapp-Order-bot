# Product Roadmap & Sprint Planning

**Product:** OrmEasy Restaurant OS  
**Updated:** 2026-11-14

This file is the short navigation/priority view. The detailed product baseline, feature gaps and acceptance gates live in:
- [Restaurant OS Gap Analysis](product/RESTAURANT_OS_GAP_ANALYSIS.md)
- [Staged Restaurant OS Roadmap](product/RESTAURANT_OS_ROADMAP.md)
- [Product Decisions](product/PRODUCT_DECISIONS.md)

## Commercial priorities

### 1. Current focus — small pizza shops, cloud kitchens and small restaurants

Goal: quick market entry and affordable recurring monthly subscriptions.

Core offer:
- Ten-minute minimum viable merchant onboarding target.
- Branded customer PWA.
- WhatsApp gateway and transactional updates.
- Reliable shared order pipeline for PWA and POS.
- Practical small-shop POS.
- Dependable KDS.
- Basic delivery/takeaway and own-rider handoff.
- Essential merchant sales/order metrics.

### 2. Expansion — medium-to-full restaurant operations

After the first segment is commercially validated:
- Dine-in table and waiter operations.
- Restaurant table reservations.
- Multi-station KDS, preparation timers and expo.
- Advanced POS and payment settlement.
- Rider dispatch and delivery operations.
- Inventory, recipes, purchasing and COGS.
- Expenses, finance, staff and advanced reporting.
- Multi-location operations when single-location workflows are mature.

Car rental is explicitly separate and is not part of this roadmap.

## Delivery sequence

| Stage | Theme | Priority |
|---|---|---|
| A0 | Order-to-kitchen correctness, pricing, idempotency, tenant isolation and end-to-end reliability | P0 |
| A1 | Pizza-grade variants, sizes, modifiers, combos and availability | P0 |
| A2 | Ten-minute merchant activation and onboarding measurement | P0 |
| A3 | Practical POS, open orders, basic tenders, receipts and cashier reconciliation | P1 |
| A4 | Basic own-rider delivery dispatch and mobile workflow | P1 |
| A5 | Merchant essentials, activation metrics and subscription entitlements | P1 |
| B1 | Tables, floor plan and waiter workflow | Later |
| B2 | Restaurant reservations and capacity management | Later |
| B3 | Multi-station KDS and advanced kitchen flow | Later |
| B4 | Payment settlement, split tenders, refunds and cash controls | Later |
| C1 | Inventory, recipes, stock movements and costing | Full restaurant |
| C2 | Finance and management reporting | Full restaurant |
| C3 | Staff operations and multi-location support | Full restaurant |

## Release discipline

- Treat this as a staged product roadmap, not a fixed calendar.
- Do not implement competitor features without validating target-segment value.
- A capability flag does not prove a workflow exists.
- Track features as declared, scaffolded, partial, implemented, verified and released.
- Require end-to-end acceptance tests before marking a workflow verified.
- Prioritize merchant activation, order correctness and subscription conversion over broad feature count.
