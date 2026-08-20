# Current State

## Recent Accomplishments
1. **Phase 2 — Merchant ROI Engine**: Built `MerchantRoiService` calculating direct revenue, average order value (AOV), direct orders volume, repeat customer retention %, and estimated marketplace commission savings. Supports `Today`, `This Week`, `This Month`, and `All Time` filters, configurable aggregator benchmark take-rates, and transparent mathematical breakdown modals.
2. **Phase 0 — Platform Architecture Freeze (Technical 95%)**:
   - **Queued WhatsApp Notifications**: `SendOrderStatusWhatsAppNotification.php` implements `ShouldQueue`, `$tries = 3`, exponential backoff, and idempotency cache locking.
   - **Audit Logging System**: Built `audit_logs` table, `AuditLog` model, and `AuditLogService` tracking sensitive tenant actions.
   - **Multi-Tenancy Isolation Security**: Created `TenantIsolationSecurityTest.php` proving zero cross-tenant data leakage across all models.
   - **Defensive Evolution Webhook Guards**: Exception isolation prevents 500 error retry storms from third-party webhook brokers.
   - **Rate Limiting Hardening**: Added `throttle:pwa-checkout` (15/min), `throttle:bot-webhook` (120/min), and `throttle:api` (60/min).
   - **Automated Database Backups**: Created `app:backup-database` scheduled daily at 02:00 AM.
3. **Phase 1 — Restaurant Beachhead & 10-Minute Onboarding (Product 85–90%)**:
   - **Interactive 10-Minute Launch Checklist**: Added a 5-step onboarding stepper (`MerchantOnboardingService.php`, `Dashboard.jsx`) guiding new restaurants from zero to live in < 10 minutes.
   - **Logo Management & Avatar Display**: Added file upload (PNG, JPG, WebP, SVG up to 3MB) in `MiniApp.jsx` branding settings with live avatar display across customer PWAs (`OrderMenu.jsx`, `MiniApp.jsx`).
   - **1-Click Customer Reorder**: Added high-visibility reorder CTA in `OrderTracking.jsx` for rapid repeat ordering.
   - **VPS Dockerfile Extensions**: Enabled `php83-exif`, `php83-gd`, `php83-intl`, `php83-fileinfo`, `php83-zip`, and `php83-bcmath` in Docker image.
4. **Test Suite Coverage**: **72/72 Pest tests passing** across capabilities, services, bookings, ROI engine, logo upload, and isolation security.

## Immediate Next Steps (Pending)
1. **Meta Embedded Signup**: Proceed with Meta's Embedded Signup integration (Facebook Login for Business) once Meta Verification is obtained.
2. **KDS Unified Improvements**: Add audio alerts and sound notifications for new incoming orders on the KDS.

## Current Focus
Phase 3 (Customer Relationship Engine & Re-engagement Campaigns) and live merchant validation.
