# OrmEasy Product Decisions

**Date:** 2026-11-14  
**Status:** Agreed product planning direction

1. **Commercial sequence:** First serve small pizza shops, cloud kitchens and small restaurants with affordable monthly subscriptions. Later expand into medium-to-full restaurant operations.
2. **Ten-minute onboarding:** The first-launch path should get a merchant to a minimum viable live setup quickly. Advanced configuration must not block launch. Measure actual time-to-first-published-PWA and first successful order.
3. **Product proposition:** Branded customer PWA + WhatsApp gateway + reliable order processing + usable POS + KDS + basic delivery.
4. **NRM use:** NRM v2.5.0 reconnaissance is a feature/workflow reference, not a clone specification or reason to delay launch.
5. **Restaurant-only scope:** Car rental is explicitly separate. Do not add car-rental domain entities, booking workflows or UI to OrmEasy. Reuse generic technical infrastructure only when boundaries remain clean.
6. **Bookings distinction:** Generic appointment booking capability is not restaurant table reservation. Table reservations require capacity, time slots, allocation and overbooking controls.
7. **Capability maturity:** Capability flags and navigation declarations do not prove feature completion. Track declared/scaffolded/partial/implemented/verified/released separately.
8. **Shared CRM:** Customer identity, addresses, consent, history and segmentation are shared infrastructure, not duplicated per workflow.
9. **Order/payment integrity first:** Advanced analytics, P&L and inventory valuation depend on trustworthy order, payment, expense and stock records.
10. **No premature ERP:** Do not delay the first small-business revenue segment for full accounting, payroll, complex inventory or enterprise reporting.
11. **Roadmap acceptance:** Each workstream must have an end-to-end acceptance gate and automated tests before being marked verified.
