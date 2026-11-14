# Product Requirements Document (PRD)

## 1. Product Vision

**OrmEasy Restaurant OS** is a multi-tenant SaaS that helps restaurants receive direct orders through WhatsApp, QR codes and tenant-branded PWA mini-apps, then manage those orders through POS, KDS and fulfilment workflows.

OrmEasy is a restaurant product, not a generic booking platform. Shared technical infrastructure may be reusable elsewhere, but other business verticals must retain separate product scope, domain models, UX and roadmaps.

## 2. Commercial priorities and target segments

### Priority 1 — Current market focus

- Small pizza shops.
- Cloud kitchens and delivery-first kitchens.
- Small takeaway and fast-food outlets.
- Small restaurants with straightforward dine-in needs.

The commercial objective is quick market entry and affordable monthly subscriptions. Optimize for fast merchant activation and practical day-one value.

### Priority 2 — Medium-to-full restaurant operations

Expand into table and waiter operations, restaurant reservations, advanced kitchen workflows, payment settlement, inventory, finance, staff and management reporting after the initial segment is commercially validated.

### Out of scope

Car rental is a separate product and is explicitly excluded from OrmEasy's restaurant domain and roadmap. Clinics, salons and other appointment-led businesses may reuse generic platform infrastructure in separate products, but their workflows are not part of this restaurant PRD.

## 3. Core product proposition

The minimum viable merchant launch should aim to take approximately ten minutes:
- Create the merchant profile and basic branding.
- Import or configure a menu.
- Connect WhatsApp.
- Configure basic delivery/takeaway rules.
- Publish the branded PWA.
- Place a successful test order through the shared order pipeline.

The ten-minute target applies to a minimum viable launch. Advanced options must not block activation, and the target must be validated through real merchant onboarding measurements.

## 4. Core ordering journey (PWA + WhatsApp gateway)

1. **Acquisition / trigger:** Customer reaches the restaurant through WhatsApp, QR code, social link or direct PWA URL.
2. **WhatsApp gateway:** The bot responds with a tenant-specific branded ordering link and can send transactional order updates.
3. **PWA mini-app:** Customer browses a visual menu, selects sizes/modifiers, manages a cart, supplies delivery/takeaway details and submits an order.
4. **Order processing:** Laravel validates authoritative catalog prices, creates the order, updates CRM and sends the order into the KDS workflow.
5. **Fulfilment:** Staff process the order through kitchen preparation and delivery/takeaway handoff.
6. **Retention:** Customer receives appropriate status updates and can return to the branded ordering experience.

## 5. Minimum product capabilities

- Multi-tenant merchant onboarding and isolation.
- Tenant-branded customer PWA.
- WhatsApp integration and transactional notifications.
- Menu/catalog with pizza sizes and modifiers.
- Shared order domain for PWA and manual POS.
- Reliable order lifecycle and KDS.
- Basic delivery/takeaway configuration.
- Essential merchant sales/order metrics.
- Subscription entitlements tied to actual shipped capabilities.

Full table service, reservations, multi-station KDS, advanced payment settlement, inventory/recipes, finance and staff scheduling are staged expansion capabilities, not blockers for the first commercial release.

## 6. Monetization direction

**Primary model:** Affordable recurring monthly subscriptions for small merchants, with plan limits and optional paid upgrades as the product matures.

Potential setup/onboarding fees or transaction charges may be tested commercially, but they are not assumed to be the primary model in this PRD. Pricing must be validated with target merchants and should not create friction that undermines quick adoption.

## 7. Product success measures

- Time from signup to published branded PWA.
- Time from signup to first successful test/live order.
- Self-service onboarding completion rate.
- Merchant activation-to-paid conversion.
- Orders per merchant and failed/duplicate order rate.
- Order-to-KDS latency and percentage of orders requiring manual correction.
- Monthly merchant retention and support burden per active merchant.

For the detailed product gaps and staged implementation sequence, see:
- [Restaurant OS Gap Analysis](product/RESTAURANT_OS_GAP_ANALYSIS.md)
- [Staged Restaurant OS Roadmap](product/RESTAURANT_OS_ROADMAP.md)
- [Product Decisions](product/PRODUCT_DECISIONS.md)
