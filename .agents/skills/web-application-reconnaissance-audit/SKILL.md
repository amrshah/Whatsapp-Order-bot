---
name: web-application-reconnaissance-audit
description: >-
  Systematically inspect an authorized web application, map its navigation and
  accessible screens, capture full-page evidence, document observed features
  and workflows, and produce a structured audit package for later analysis.
license: MIT
metadata:
  type: specialist-capability
  category: engineering
  version: "1.0.0"
---

# Web Application Reconnaissance & Feature Audit

## Purpose

Perform evidence-led reconnaissance of an existing web application. Discover its accessible information architecture, pages, controls, feature behavior and business workflows. Capture full-page screenshots and produce documentation that another agent or product team can use without repeating the exploration.

This skill is application-agnostic. It applies to SaaS products, restaurant systems, CRMs, ERPs, booking platforms, dashboards and other browser-based applications.

This skill collects evidence. It does not decide which features another product should copy or implement; competitive comparison and roadmap decisions belong to a separate analysis activity.

## Activation

Use when asked to inspect, audit, document, map, benchmark or understand an existing web application through an authorized user account, especially when a complete screen-by-screen evidence pack is required.

## Inputs

Required:
- Application URL.
- Authorized username or email.
- Authorized password, supplied securely at runtime.

Optional:
- Application context and known product/module terminology.
- Exploration scope (default: all pages and features accessible to the supplied account).
- Output directory (default: `artifacts/web-app-audit/<application-slug>/`).
- Browser viewport and locale requirements.
- Explicit authorization for any state-changing test data or actions.

Ask for missing required inputs. Never infer credentials or attempt to obtain them from browser storage, source code, logs or unrelated files.

## Tool requirements

- A browser automation tool capable of navigation, DOM/accessibility inspection, interaction and screenshots. Prefer Playwright or an approved browser MCP.
- Local filesystem access for saving screenshots and reports.
- Optional image inspection capability for verifying screenshot completeness.

Use the configured browser tool. Do not assume a particular MCP tool name or invent browser commands. If the required browser capability is unavailable, report the limitation and request an approved alternative.

## Procedure

### 1. Establish a safe session

1. Create the output directory and record the audit start time.
2. Open the supplied URL and inspect the login page.
3. Authenticate only with the credentials supplied for this audit.
4. Confirm successful login and record the landing page.
5. Keep the authenticated session in the browser context for the duration of the audit.
6. Never write passwords, session cookies, authorization headers, access tokens or other secrets to logs, screenshots, reports, filenames or repository files.
7. If login fails, MFA is required, CAPTCHA appears, or access is blocked, stop at that boundary and report it. Do not bypass security controls.

### 2. Build the navigation inventory

Inspect all visible and accessible navigation mechanisms:
- Sidebar and nested menus.
- Top navigation and dropdowns.
- Tabs and contextual navigation.
- Dashboard shortcuts.
- Profile, account and settings menus.
- Footer links where relevant.

Record each discovered destination, its label, parent, route/URL, and discovery source. Expand menus before concluding that a section has no children.

Create a navigation tree before deep exploration. Track each item as queued, visited, restricted, unavailable or intentionally skipped.

### 3. Explore every accessible page

Visit each discovered destination systematically. For every page:
1. Wait for meaningful content and loading indicators to settle.
2. Record the page title, route/URL, module, parent navigation item and purpose.
3. Inspect the full page, including content below the initial viewport.
4. Identify visible components: cards, tables, charts, forms, filters, search, pagination, tabs, status indicators, summaries and empty states.
5. Record available actions and relevant input fields.
6. Note relationships to other modules and navigation destinations.
7. Capture a full-page screenshot.
8. Add the page to the coverage ledger.

Do not treat a route as explored merely because it loaded. Inspect its actual content and meaningful interaction affordances. Avoid duplicate work when multiple navigation items resolve to the same page, but record each navigation path.

### 4. Inspect interactive states safely

Inspect relevant controls such as:
- Create, edit, view and action buttons.
- Dropdowns, menus, tabs, accordions and modals.
- Search, sorting, filters and pagination.
- Forms, validation messages and date/time selectors.
- Export/import controls and print views.
- Status transitions and bulk actions.

Prefer non-destructive inspection. Opening a form or modal and capturing it is generally acceptable; submitting it is not automatically authorized.

Do not create, edit, delete or bulk-update persistent records; send emails/messages; trigger notifications; issue refunds; place or pay for orders; change account/security settings; or cause other external side effects unless the user explicitly authorizes that exact class of action. Never test destructive actions on production data.

If a control's behavior cannot be safely tested, document what is visible and mark its behavior as observed but unverified. Do not invent its function.

### 5. Screenshot requirements

Capture:
- One full-page screenshot for every accessible page.
- Additional screenshots for meaningful modal, dropdown, expanded, tabbed, form, validation or other important states.
- Separate screenshots for very long pages if the browser cannot reliably capture the entire page in one image.

Use a consistent viewport and preserve readable content. Prefer browser-native full-page capture. Verify that the resulting image includes content below the fold and is not blank, clipped or captured during loading.

Suggested structure:

```text
artifacts/web-app-audit/<application-slug>/
  screenshots/
    authentication/
    dashboard/
    <module-slug>/
  application-overview.md
  navigation-map.md
  screen-catalog.md
  feature-inventory.csv
  workflow-catalog.md
  coverage-report.md
  application-inventory.json
  screenshot-index.csv
```

Filename convention:
`<module>_<page>_<state>.png`

Examples:
- `orders_order-list_default.png`
- `orders_create-order_form.png`
- `orders_order-details_actions-menu.png`

Use stable, filesystem-safe names. Never include usernames, customer names, email addresses, phone numbers, financial details or other personal data in filenames.

If screenshots contain personal, customer, employee or payment information, avoid capturing it where possible. If it cannot be avoided, treat the audit package as sensitive, do not publish it or commit it to a repository, and follow the user's approved storage/retention instructions. Redact sensitive values only in copies and preserve the original only if explicitly authorized.

### 6. Document each screen

For every discovered page, add a concise but useful entry:

- Screen name.
- Route/URL.
- Module and navigation path.
- Purpose.
- Main components and displayed information.
- Available actions.
- Filters, search, sorting and pagination.
- Forms and important fields, where visible.
- Related modules and workflows.
- Notable UX patterns or accessibility observations.
- Screenshot references.
- Verification status and limitations.

Clearly distinguish:
- **Verified:** behavior was safely exercised and confirmed.
- **Observed:** visible in the interface but not functionally tested.
- **Inferred:** interpretation based on interface evidence; not confirmed.
- **Restricted:** inaccessible due to permissions or access boundaries.
- **Unavailable:** link/route failed or resource was not available.

Do not describe inferred behavior as a product capability.

### 7. Build the feature inventory

Create a CSV with at least these columns:

`module,feature,description,route,screen,interaction_type,related_modules,verification_status,screenshot_refs,observations`

Use one row per meaningful feature or capability, not one row per button. Keep descriptions factual and concise. Where a feature is repeated across modules, record its context rather than silently deduplicating meaningful differences.

Also create `application-inventory.json` containing application metadata, navigation nodes, screens, features, workflows, screenshot references and coverage counts. Keep it valid JSON and consistent with the Markdown/CSV reports.

### 8. Discover end-to-end workflows

Identify important workflows by following visible links and safely inspectable state transitions. For each workflow record:
- Name and business purpose.
- Starting screen.
- Actors/roles visible or documented.
- Steps and decision points.
- Required inputs and validations observed.
- Resulting state, only when confirmed.
- Related modules.
- Evidence and screenshots.
- Unverified steps or safety restrictions.

For restaurant applications, examples may include order intake, kitchen preparation, order handoff, delivery assignment, payment recording, menu maintenance, inventory updates, customer management and reporting. These are exploration prompts, not assumptions that the target system implements them.

### 9. Produce the audit package

Required deliverables:
1. `application-overview.md`: application identity, context, main modules and high-level observations.
2. `navigation-map.md`: hierarchical navigation tree with route and coverage status.
3. `screen-catalog.md`: screen-by-screen documentation.
4. `feature-inventory.csv`: structured feature matrix.
5. `workflow-catalog.md`: observed workflows and evidence.
6. `coverage-report.md`: counts, restrictions, gaps and limitations.
7. `application-inventory.json`: machine-readable consolidated inventory.
8. `screenshot-index.csv`: screen/state, relative screenshot path, capture type and verification status.
9. `screenshots/`: full-page screenshots and important interaction states.

### 10. Reconcile coverage and quality

Before completion:
- Revisit the navigation inventory and account for every discovered item.
- Confirm each accessible unique page has a full-page screenshot.
- Confirm screenshot files exist, open successfully and are readable.
- Confirm screenshot references resolve from the index and screen catalog.
- Confirm every page has documentation and a verification status.
- Check JSON and CSV syntax.
- Reconcile reported counts against actual inventory entries and screenshot files.
- Identify pages not explored, inaccessible modules, failed routes and controls left untested.
- Ensure no credentials or secrets appear in outputs.
- Ensure the package does not contain unapproved sensitive data.

Do not claim complete coverage if any discovered item remains unexplored or unaccounted for. Report both the number of discovered navigation entries and the number of unique pages, since several entries may lead to one page.

## Outputs

A self-contained evidence package in the requested output directory, following the structure above. Reports must be useful to a second agent without requiring access to the original browser session.

## Quality checks

- [ ] Authentication used only the supplied authorized credentials.
- [ ] No credentials, tokens or session secrets were persisted.
- [ ] Navigation entries were reconciled against the coverage ledger.
- [ ] Every accessible unique page has a full-page screenshot or a documented capture limitation.
- [ ] Important interactive states have additional evidence where safe.
- [ ] Screen descriptions distinguish observed, verified and inferred behavior.
- [ ] Workflows are evidence-backed.
- [ ] JSON and CSV parse successfully.
- [ ] Screenshot index paths resolve and counts match.
- [ ] Restricted, unavailable and unexplored areas are disclosed.
- [ ] No unauthorized state-changing actions were performed.

## Boundaries

- This is reconnaissance and documentation, not penetration testing, vulnerability scanning or security-control bypass.
- Do not bypass MFA, CAPTCHA, paywalls, role restrictions or other access controls.
- Do not perform destructive or externally visible actions without explicit authorization.
- Do not fabricate routes, features, roles, workflows, metrics or outcomes.
- Do not expose or commit credentials, session data or sensitive screenshots.
- Do not make competitive product recommendations in this skill. Hand the evidence package to a separate competitive-analysis skill or review process.
- A screenshot alone is not proof that a feature works.
