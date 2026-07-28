# Skills

Agent Skills for **@fundamental-ngx** provide AI assistants with step-by-step guidance for building, testing, migrating, and reviewing Angular components with this library. These skills help AI agents (like Claude Code) complete complex multi-step tasks accurately without hallucinating APIs.

## What are Skills?

Skills are markdown-based task playbooks specifically designed for AI assistants. Each skill contains:

- **Phased workflows** — Step-by-step instructions that guide the AI from discovery through implementation
- **API lookup patterns** — How to query the MCP server for accurate, up-to-date component APIs before writing code
- **Project conventions** — Enforced Angular 22+ patterns, NX workspace commands, and library-specific rules
- **Validation steps** — How to verify the output compiles and behaves correctly

## Available Skills

fundamental-ngx provides **14 skills** organized by purpose:

### Building & Setup (5 skills)

Create new Angular projects and generate component implementations from scratch:

- **setup-project** — Scaffold a new Angular app with `@fundamental-ngx` installed, a theme applied, and a working first component
- **scaffold** — Generate a component using established fundamental-ngx patterns: dialog, table, card, form, shell, or layout-grid
- **build-form** — Build a reactive form using `fdp-form-group` and `fdp-form-field` with field validation and error states
- **build-table** — Build a `fdp-table` data table with `FdpTableDataSource`, sorting, filtering, pagination, and row selection
- **build-page-layout** — Build a page layout using `fd-dynamic-page` or `fdp-dynamic-page` with collapsing header, subheader, tabs, and footer

### Code Quality & Review (5 skills)

Verify and improve the quality of existing code:

- **best-practices** — Audit any component or folder against Angular 22+ conventions and project-specific rules
- **review-pr** — Review a pull request, reporting blocking issues, suggestions, and nits grouped by severity
- **create-test** — Generate or update unit tests for a component following project testing conventions
- **a11y-audit** — Audit a component for WCAG AA accessibility compliance across semantic HTML, ARIA, keyboard, and focus
- **preflight** — Run all local quality gates (format, lint, build, test) before opening a PR

### Migration & Maintenance (4 skills)

Keep the codebase up to date with evolving standards and dependencies:

- **migrate** — Migrate a component or directive from decorator-based patterns to Angular 22+ signal-based patterns
- **update-docs** — Verify that documentation examples are in sync with a component's current public API and fix any drift
- **adopt-styles** — Apply breaking changes from `fundamental-styles` into the Angular component templates and class bindings
- **i18n-manage** — Add, rename, or remove i18n translation keys across `FdLanguage`, `.properties` files, and generated types

## Installation

Skills are included automatically when you work in the fundamental-ngx repository. The `.claude/skills/` directory is checked in alongside the source code.

To install the skills into any external project:

```bash
# Install at project level (only available in this project)
npx skills add SAP/fundamental-ngx

# Or install globally (available across all your projects)
npx skills add SAP/fundamental-ngx -g
```

### Browse Available Skills

Before installing, preview what skills are available:

```bash
npx skills add SAP/fundamental-ngx -l
```

### Install Individual Skills

If you only need specific skills:

```bash
# Install only the scaffold skill
npx skills add SAP/fundamental-ngx -s scaffold

# Install only migration and best-practices
npx skills add SAP/fundamental-ngx -s migrate,best-practices

# Install all building skills
npx skills add SAP/fundamental-ngx -s setup-project,scaffold,build-form,build-table,build-page-layout
```

Available skill IDs:

```
setup-project
scaffold
build-form
build-table
build-page-layout
best-practices
review-pr
create-test
a11y-audit
preflight
migrate
update-docs
adopt-styles
i18n-manage
```

### Verify Installation

After installing, verify that skills are available:

```bash
# List installed skills
npx skills list

# Or list global skills
npx skills list -g
```

In Claude Code, test by typing a skill command:

```
/scaffold
/build-form
/migrate
```

The skill content should load immediately. If skills don't appear, try restarting Claude Code.

## Skills vs MCP Tools

fundamental-ngx provides two complementary ways to access information:

| Feature        | Skills                                           | MCP Tools                                       |
| -------------- | ------------------------------------------------ | ----------------------------------------------- |
| **Purpose**    | Multi-step task execution                        | Quick API lookups & code generation             |
| **Content**    | Phased workflows, conventions, validation steps  | Component APIs, HTML examples, usage guides     |
| **Activation** | Type `/skill-name` or AI auto-loads              | Call tool functions (e.g., `get_component_api`) |
| **Length**     | Detailed step-by-step playbooks                  | Focused, concise responses                      |
| **Best For**   | Building features end-to-end, migrations, audits | Looking up an input, getting an HTML snippet    |

### When to Use Each

Use **Skills** for:

- Building a feature end-to-end (new form, table, page layout)
- Migrating existing code to Angular 22+ signal patterns
- Reviewing a PR or auditing a component for quality
- Running pre-PR quality checks
- Managing i18n keys or adopting style library changes

Use **MCP Tools** for:

- Getting a component's current input/output API
- Fetching a working HTML example to reference
- Looking up usage guides mid-implementation

## How AI Agents Use Skills

### Explicit Activation (Recommended)

Type the skill name as a slash command:

```
/scaffold dialog
→ Generates a dialog component using the correct fd-dialog pattern

/build-form UserProfile id:number name:string email:string role:select
→ Builds a reactive form with those fields, validation, and error states

/migrate libs/core/button
→ Migrates button component to signal-based inputs and outputs

/review-pr 1234
→ Reviews PR #1234 and reports blocking/suggestion/nit findings
```

### Automatic Activation (Smart Detection)

AI assistants like Claude Code will automatically load relevant skills based on your request:

```
You: "Create a data table for displaying orders"
→ AI loads: build-table skill
→ Follows: FdpTableDataSource setup, column definition, sorting/pagination wiring

You: "Migrate this component to use signals"
→ AI loads: migrate skill
→ Follows: @Input → input(), @Output → output(), @HostBinding → host: {} migration phases

You: "Run quality checks before I open a PR"
→ AI loads: preflight skill
→ Runs: format, lint, build, test in the correct order for affected libraries
```
