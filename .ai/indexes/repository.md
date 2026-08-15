# Repository Index

Maps high-level business logic concepts to specific code directories and files.

## SaaS Administration
- **Tenant Management**: `app/Models/Tenant.php`, `app/Http/Controllers/Admin/TenantController.php`
- **SaaS UI**: `resources/js/Pages/Admin/Tenants/Edit.jsx`

## Multi-Tenancy
- **Package**: `stancl/tenancy`
- **Configuration**: `config/tenancy.php`
- **Middleware**: Used across web and API routes to initialize tenant scope.

## WhatsApp Bot Module
- **Namespace**: `Modules\Bot`
- **Webhook Entrypoints**: `Modules/Bot/app/Http/Controllers/BotController.php` (Meta API), `Modules/Bot/app/Http/Controllers/EvolutionWebhookController.php` (Evolution/Baileys API)
- **Models**: `Modules/Bot/app/Models/BotSession.php`, `Modules/Bot/app/Models/WhatsAppConnection.php` (Tenant active WhatsApp channel instance)
- **Services & Providers**: `Modules/Bot/app/Services/Contracts/WhatsAppProvider.php` (Message sending interface), `Modules/Bot/app/Services/Providers/` (EvolutionApiProvider & MetaCloudProvider implementations), `Modules/Bot/app/Services/WhatsAppProviderResolver.php` (Dynamically resolves connection model)
- **Message Handlers**: `Modules/Bot/app/Services/Handlers/` (e.g., `WelcomeHandler.php`)
- **Simulator UI**: `resources/js/Pages/Bot/Simulator.jsx`

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
