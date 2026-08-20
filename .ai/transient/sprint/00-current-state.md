# Current State

## Recent Accomplishments
1. **Multi-Vertical Capability Architecture & Presets**: Transformed the application from a restaurant-only tool into a generic, capability-driven business operating system. Created `TenantCapability` and `BusinessType` enums, `TenantCapabilityService`, `RequireCapability` middleware, and automated capability dependency resolution graph.
2. **Dynamic Industry Onboarding Presets**: Added preset selection (Restaurant, Clinic, Salon, Law Firm, Workshop, Retail Store) on registration (both regular and OAuth Google/Facebook). Selecting an industry preset automatically provisioned appropriate tenant capabilities, primary customer experience (`order`, `book`), and tenant workspace naming.
3. **Decoupled PWA Shell & Experience Resolution**: Implemented `PwaExperienceResolver` and capability-gated experience routes (`/app/{tenant_slug}/{experience}`). Requests for disabled experiences (e.g. clinic accessing `/order`) gracefully 302 redirect to the active primary experience (`/book`), while backend API mutations (e.g. `/checkout`) return 403 Forbidden.
4. **Service Catalog & Offerings Management (`/services`)**: Created `Service` model, migration, controller, and Inertia React UI allowing non-ordering businesses (Clinics, Salons, Law Firms, etc.) to manage services with duration, pricing, and active toggles.
5. **Appointments & Bookings Domain (`/bookings`)**: Implemented `Booking` model, migration, controller, and interactive React UI with status workflow tabs (Pending, Confirmed, Completed, Cancelled), notes, and direct click-to-chat WhatsApp action buttons.
6. **Customer PWA Appointment Request Submission (`POST /app/{slug}/book`)**: Connected the PWA booking panel to dynamic active services with customer auto-upsert into CRM and booking persistence.
7. **OAuth User "Set Password" Flow**: Fixed the OAuth credential edge case where Google/Facebook users were blocked on profile password changes due to missing current passwords. Added `password_set_at` timestamp tracking and adapted `UpdatePasswordForm.jsx` to dynamically render a "Set Password" flow without requiring a current password.
8. **Vector Icons Across All UIs**: Strict enforcement of Lucide React vector icons across registration presets, PWA shell, services, bookings, and dashboard cards with zero emoji dependencies.

## Immediate Next Steps (Pending)
1. **Meta Embedded Signup**: Proceed with Meta's Embedded Signup integration (Facebook Login for Business) once Meta Verification is obtained.
2. **KDS Unified Improvements**: Add audio alerts and sound notifications for new incoming orders on the KDS.

## Current Focus
Multi-vertical capability validation on VPS, followed by real WhatsApp bot appointment slot intake workflows.
