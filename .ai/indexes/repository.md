# Repository Index

Maps high-level business logic concepts to specific code directories and files.

## Central SaaS Admin (Platform Administration / Tenant Management)
- **Routes File**: `routes/admin.php`
- **Tenant Management**: `app/Models/Tenant.php`, `app/Http/Controllers/Admin/TenantController.php`
- **Invoices & Settings**: `app/Http/Controllers/Admin/InvoiceController.php`, `app/Http/Controllers/Admin/SettingsController.php`
- **SaaS UI Views**: `resources/js/Pages/Admin/Tenants/`, `resources/js/Pages/Admin/Settings.jsx`, `resources/js/Pages/Admin/Invoices/`

## Multi-Tenancy
- **Package**: `stancl/tenancy`
- **Configuration**: `config/tenancy.php`
- **Middleware**: Used across web and API routes to initialize tenant scope.

## Authorization & Security (MFA)
- **Role/Permission Enums**: `app/Enums/UserRole.php`, `app/Enums/UserPermission.php`
- **MFA Config**: `config/fortify.php`
- **MFA Controllers**: `app/Http/Controllers/Auth/TwoFactorAuthenticationController.php`, `app/Http/Controllers/Auth/TwoFactorChallengeController.php`
- **MFA React Views**: `resources/js/Pages/Auth/TwoFactorChallenge.jsx`, `resources/js/Pages/Profile/Partials/TwoFactorSettings.jsx`
- **MFA Integration Tests**: `tests/Feature/TwoFactorAuthenticationTest.php`

## WhatsApp Bot Module
- **Namespace**: `Modules\Bot`
- **Webhook Entrypoints**: `Modules/Bot/app/Http/Controllers/BotController.php` (Meta API), `Modules/Bot/app/Http/Controllers/EvolutionWebhookController.php` (Evolution/Baileys API)
- **Models**: `Modules/Bot/app/Models/BotSession.php`, `Modules/Bot/app/Models/WhatsAppConnection.php` (Tenant active WhatsApp channel instance)
- **Services & Providers**: `Modules/Bot/app/Services/Contracts/WhatsAppProvider.php` (Message sending interface), `Modules/Bot/app/Services/Providers/` (EvolutionApiProvider & MetaCloudProvider implementations), `Modules/Bot/app/Services/WhatsAppProviderResolver.php` (Dynamically resolves connection model)
- **Message Handlers**: `Modules/Bot/app/Services/Handlers/` (e.g., `WelcomeHandler.php`)
- **Simulator UI**: `resources/js/Pages/Bot/Simulator.jsx`

## Multi-Vertical Capability & ROI Engine
- **Capability Enums**: `app/Enums/TenantCapability.php`, `app/Enums/BusinessType.php`
- **Registry & Graph**: `app/Capability/CapabilityRegistry.php`, `app/Capability/CapabilityDefinition.php`
- **Service & Model**: `app/Services/TenantCapabilityService.php`, `app/Models/TenantCapability.php`
- **Middleware**: `app/Http/Middleware/RequireCapability.php` (`capability:{name}`)
- **Merchant ROI Engine**: `app/Services/MerchantRoiService.php` (Revenue, AOV, commission savings, repeat retention)
- **10-Minute Onboarding**: `app/Services/MerchantOnboardingService.php` (Launch checklist progress)

## Services & Bookings Domains
- **Services (Catalog for Appointments)**: `app/Models/Service.php`, `app/Http/Controllers/ServicesController.php`, `resources/js/Pages/Services/Index.jsx`
- **Bookings (Appointments)**: `app/Models/Booking.php`, `app/Http/Controllers/BookingsController.php`, `resources/js/Pages/Bookings/Index.jsx`
- **PWA Experience Resolver**: `app/Services/PwaExperienceResolver.php`, `app/Http/Controllers/Pwa/MiniAppController.php`

## Customer PWA Mini-App
- **Controller**: `app/Http/Controllers/Pwa/MiniAppController.php`, `app/Http/Controllers/Pwa/PwaController.php` (Includes `uploadLogo`, checkout, reorder)
- **Token Cryptography**: `Modules/Bot/app/Services/CustomerPwaTokenService.php` (15-min signed tokens)
- **PWA Layout**: `resources/js/Layouts/PwaLayout.jsx`
- **PWA Client Pages**: `resources/js/Pages/Pwa/MiniApp.jsx` (Composable shell), `resources/js/Pages/Pwa/OrderMenu.jsx`, `resources/js/Pages/Pwa/OrderTracking.jsx`

## Configuration, Audit & Reliability Layer
- **Tenant Settings Model**: `app/Models/TenantSetting.php`
- **Settings Service**: `app/Services/TenantSettingsService.php`
- **Audit Logging**: `app/Models/AuditLog.php`, `app/Services/AuditLogService.php`
- **Database Backup**: `app/Console/Commands/BackupDatabaseCommand.php` (`app:backup-database`)
- **Settings Dashboard UI**: `resources/js/Pages/Settings/MiniApp.jsx`
- **Queued WhatsApp Milestone Listener**: `app/Listeners/SendOrderStatusWhatsAppNotification.php` (ShouldQueue, retries, idempotency)

## Menu Module (Ordering Verticals)
- **Namespace**: `Modules\Menu`
- **Category & Products**: `Modules/Menu/app/Models/Category.php`, `Modules/Menu/app/Models/Product.php`
- **Controllers**: `Modules/Menu/app/Http/Controllers/CategoryController.php`
- **UI**: `resources/js/Pages/Menu/`

## Integrations
- **Tenant WhatsApp Settings**: `app/Http/Controllers/SettingsController.php`, `resources/js/Pages/Settings/Integrations.jsx` (Allows scanning connection QR Code or saving Meta credentials)

## Documentation
- **Tenant Onboarding Guide**: `docs/TENANT_WHATSAPP_ONBOARDING.md`
- **SaaS Admin WhatsApp Setup**: `docs/META_WHATSAPP_INTEGRATION_GUIDE.md`
