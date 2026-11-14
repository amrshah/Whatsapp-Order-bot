# Task: Comprehensive Restaurant Management System Reconnaissance

Use the Alamia Skills skill:

`web-application-reconnaissance-audit`

Skill repository:
https://github.com/AlamiaSoft/Alamia-Skills-System

Skill path:
`catalog/domains/engineering/web-application-reconnaissance-audit/SKILL.md`

## 1. Objective

Conduct a comprehensive, evidence-based reconnaissance audit of the supplied restaurant management web application.

Explore every accessible module, page and meaningful interactive state. Capture full-page screenshots and document the functionality of each screen.

We will subsequently use this evidence to compare the competing application against our OrmEasy restaurant management platform and identify opportunities to improve OrmEasy.

Do not begin competitive analysis or implementation yet. Your first responsibility is collecting a complete and trustworthy evidence package.

## 2. Canonical Output Repository

All audit deliverables MUST be committed and pushed to:

https://github.com/AlamiaSoft/piznasw-review

Git:
`https://github.com/AlamiaSoft/piznasw-review.git`

Default branch:
`main`

This repository is the canonical source of truth for the audit.

Do not keep the only copy of screenshots or reports in your local workspace.

### Repository structure

Organize the repository as follows:

\`\`\`
piznasw-review/
│
├── README.md
├── docs/
│   ├── application-overview.md
│   ├── navigation-map.md
│   ├── screen-catalog.md
│   ├── feature-inventory.csv
│   ├── workflow-catalog.md
│   ├── coverage-report.md
│   └── competitive-analysis-input.md
│
├── data/
│   ├── application-inventory.json
│   ├── screenshot-index.csv
│   └── navigation-inventory.json
│
├── screenshots/
│   ├── authentication/
│   ├── dashboard/
│   ├── modules/
│   │   ├── orders/
│   │   ├── menu/
│   │   ├── kitchen/
│   │   ├── customers/
│   │   ├── inventory/
│   │   ├── staff/
│   │   ├── delivery/
│   │   ├── payments/
│   │   ├── reports/
│   │   └── settings/
│   └── interactive-states/
│
└── audit-log/
    └── exploration-log.md
\`\`\`

Adapt the module directories to the actual application. Do not create empty directories merely to match these examples.

## 3. Repository and Git Workflow

1. Clone the repository into your workspace.
2. Inspect its initial state.
3. Perform the audit in a dedicated branch named:

   `audit/initial-reconnaissance`

4. Commit work incrementally. Do not wait until the entire audit is finished.
5. Push screenshots and documentation as exploration progresses.
6. Use meaningful commit messages.
7. Keep README.md updated with audit progress and links to major deliverables.
8. When finished, push all changes and create a pull request targeting `main`.

Do not commit passwords, session cookies, access tokens, customer PII, payment information or other secrets.

Screenshots are important deliverables. Keep them in the Git repository, but avoid capturing sensitive personal or financial information. Redact sensitive content where necessary.

Use Git LFS only if screenshot volume or repository size makes ordinary Git impractical. Do not silently omit screenshots because of size limitations.

## 4. Reconnaissance Execution

Follow the Alamia skill procedure.

- Authenticate using the credentials supplied separately at runtime.
- Map all accessible navigation elements.
- Explore each discovered page.
- Capture a full-page screenshot for every accessible unique page.
- Explore significant modals, dropdowns, forms and expanded states.
- Document screen purpose, components, actions and functionality.
- Identify business workflows and relationships between modules.
- Record access restrictions and unexplored areas.
- Maintain a navigation coverage ledger.

Use safe, non-destructive inspection. Do not modify production records or execute transactions without explicit authorization.

## 5. Particular Attention: Restaurant Management Functionality

While exploring, pay particular attention to the following categories. These are investigation areas, not assumptions that the application implements them.

**Restaurant operations**
- Order management
- Dine-in, takeaway and delivery
- Table management and reservations
- POS and cashier operations
- Kitchen Display System (KDS)
- Order status management

**Menu and products**
- Menu categories
- Product variations and modifiers
- Add-ons and toppings
- Pricing and discounts
- Menu availability
- Branch-specific menus

**Customers and marketing**
- Customer profiles
- Customer history
- Loyalty and rewards
- Coupons and promotions
- Customer segmentation
- Feedback and reviews

**Inventory and procurement**
- Stock management
- Ingredients and recipes
- Purchase orders
- Suppliers
- Stock deduction
- Wastage and adjustments
- Low-stock alerts

**Delivery and fleet**
- Rider management
- Delivery assignment
- Delivery tracking
- Delivery charges
- Delivery zones
- Rider applications or interfaces

**Staff and administration**
- Employees and roles
- Permissions
- Attendance and shifts
- Cash reconciliation
- Branch management
- Audit logs

**Finance and reporting**
- Sales reports
- Expenses
- Taxes
- Payment methods
- Settlements
- Profitability
- Operational KPIs

**Integrations and automation**
- WhatsApp
- Online ordering
- Third-party delivery platforms
- APIs and webhooks
- Notifications
- Automated workflows
- AI-powered features

Explore additional features beyond these categories whenever discovered.

## 6. Documentation Standards

Every accessible screen must have:
- A descriptive name.
- Route or URL.
- Navigation location.
- Short explanation of purpose.
- Description of its main components.
- Available actions and controls.
- Relevant relationships with other modules.
- Verification status.
- Screenshot references.

Clearly distinguish verified, observed, inferred, restricted and unavailable functionality.

## 7. Screenshot Standards

- Capture the complete page, not just the initial viewport.
- Use consistent viewport dimensions.
- Ensure the page has finished loading.
- Capture readable content.
- Capture important interaction states separately.
- Use module-based filenames.
- Verify screenshots actually exist and are readable.

Example:

\`screenshots/modules/orders/order-list_default.png\`

Every screenshot must be referenced in `data/screenshot-index.csv`.

## 8. Audit Quality and Coverage

Before marking the task complete:

- Reconcile every discovered navigation item.
- Verify each accessible unique page has a screenshot.
- Ensure all screenshots have matching documentation.
- Check that JSON and CSV files are valid.
- Verify screenshot references.
- Reconcile the page and screenshot counts.
- Report inaccessible or unexplored areas.
- Ensure secrets and sensitive information are not committed.

Never claim 100% coverage without evidence.

## 9. Final Repository Deliverables

The final repository must contain:

1. Application overview.
2. Complete navigation map.
3. Screen-by-screen documentation.
4. Structured feature inventory.
5. Workflow catalog.
6. Machine-readable application inventory.
7. Screenshot index.
8. Full-page screenshot collection.
9. Coverage and limitations report.
10. Exploration log.
11. README with an executive summary and links to all deliverables.

Also create `docs/competitive-analysis-input.md` containing a factual summary of observed capabilities, potential differentiators, and areas that warrant comparison against OrmEasy. Do not make unsupported claims about OrmEasy functionality.

## 10. Final Handoff

After completing the audit:

1. Push all deliverables to `audit/initial-reconnaissance`.
2. Verify the remote branch contains all files.
3. Create a pull request against `main`.
4. Report the PR URL.
5. Report discovered modules, unique pages, screenshots, documented features and workflows.
6. List any outstanding limitations.
7. Provide the repository links to the principal reports.

Do not start feature implementation.

Our next stage will be an independent review of this repository's evidence against OrmEasy. Preserve the findings so they can be consumed by another AI agent or development team without needing to repeat the browser exploration.

**Success means a complete, readable, committed and reviewable audit repository—not simply a collection of screenshots on your local machine.**