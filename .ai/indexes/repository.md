# Repository Index

Maps high-level business logic concepts to specific code directories and files.

## SaaS Administration
- **Tenant Management**: `app/Models/Tenant.php`, `app/Http/Controllers/Admin/TenantController.php`
- **SaaS UI**: `resources/js/Pages/Admin/Tenants/Edit.jsx`

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

## Customer PWA Mini-App
- **Controller**: `app/Http/Controllers/Pwa/PwaController.php` (Includes token exchange, menu rendering, checkout, order tracking, and dynamic manifest outputs)
- **Token Cryptography**: `Modules/Bot/app/Services/CustomerPwaTokenService.php` (15-min signed tokens)
- **PWA Layout**: `resources/js/Layouts/PwaLayout.jsx` (Includes Hamburger menu side-navigation drawer and localStorage order trackers)
- **PWA Client Pages**: `resources/js/Pages/Pwa/OrderMenu.jsx`, `resources/js/Pages/Pwa/OrderTracking.jsx` (Dynamic styles and real-time Reverb broadcasts)

## Configuration & Settings Layer
- **Tenant Settings Model**: `app/Models/TenantSetting.php`
- **Settings Service**: `app/Services/TenantSettingsService.php`
- **Settings Dashboard UI**: `resources/js/Pages/Settings/MiniApp.jsx`
- **Custom Status Notifications Listener**: `app/Listeners/SendOrderStatusWhatsAppNotification.php`

## Menu Module
- **Namespace**: `Modules\Menu`
- **Category & Products**: `Modules/Menu/app/Models/Category.php`, `Modules/Menu/app/Models/Product.php`
- **Controllers**: `Modules/Menu/app/Http/Controllers/CategoryController.php` (Includes `applyTemplate` logic for predefined menu categories).
- **UI**: `resources/js/Pages/Menu/`

## Integrations
- **Tenant WhatsApp Settings**: `app/Http/Controllers/SettingsController.php`, `resources/js/Pages/Settings/Integrations.jsx` (Allows scanning connection QR Code or saving Meta credentials)

## Documentation
- **Tenant Onboarding Guide**: `docs/TENANT_WHATSAPP_ONBOARDING.md`
- **SaaS Admin WhatsApp Setup**: `docs/META_WHATSAPP_INTEGRATION_GUIDE.md`
