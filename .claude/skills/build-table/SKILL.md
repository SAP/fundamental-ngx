---
name: build-table
description: Build a @fundamental-ngx/platform data table with FdpTableDataSource, sorting, filtering, pagination, and row selection
argument-hint: <table-name> [sort] [filter] [paginate] [select=single|multiple]
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(nx *), Bash(ng build*), Write, Edit
---

# Build Table: $ARGUMENTS

If `$ARGUMENTS` is empty, ask: (1) what data the table displays, (2) which features are needed.

## Phase 1: Determine Scope

Parse from `$ARGUMENTS` or ask:

- **Table name** (PascalCase, e.g., `Users`, `Orders`)
- **Data model**: field names + TypeScript types (used for column definitions and the data interface). If not provided in `$ARGUMENTS`, ask explicitly: "What columns should the table have? Please list field name and type, e.g.: `id:number, customerName:string, status:string`"
- **Base component**: `fdp-table` (platform, feature-rich — default) | `fd-table` (core, markup-level, use only for purely presentational tables)
- **Features** (check all that apply):
    - `sort` — sortable column headers
    - `filter` — per-column or global search filter
    - `paginate` — page size picker + page navigation
    - `select` — row selection (`single` | `multiple`)
    - `toolbar` — title bar with action buttons
- **Data source**: static array | observable | HTTP service (lazy)

Default to `fdp-table` with `sort + paginate` unless the user specifies otherwise.

## Phase 2: Gather Component Context

Call the `@fundamental-ngx/mcp` MCP server:

1. `get_usage_guide('table')` — DataSource patterns, variant decision tree, pitfalls
2. `get_component_api('fdp-table')` — all inputs/outputs, selection mode options, page size inputs
3. If `filter` requested: `get_component_api('fdp-table-toolbar')` for filter toolbar wiring
4. If custom cell rendering needed: look for `fdpTableCell` template directive API

If MCP is unavailable, read `libs/mcp-server/src/data/usage-guides.ts`.

## Phase 3: Present Plan

Output this summary before writing any code:

```
## Table Plan: [TableName]

**Component:** fdp-table
**DataSource type:** FdpTableDataSource (wraps observable)
**Features:** sort ✓ | filter ✓ | paginate ✓ | select(multiple) ✓

| Column key | Label | Type | Sortable | Filterable | Width |
|------------|-------|------|----------|------------|-------|
| name | Name | string | yes | yes | auto |
| status | Status | string | yes | yes | 120px |
| createdAt | Created | date | yes | no | 160px |

**Toolbar actions:** Add, Delete selected
```

**Stop here and wait for approval before generating code.**

## Phase 4: Generate Component

Create three files in the target path (ask the user if not already known).

### TypeScript (`.component.ts`)

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
    TableComponent,
    TableColumnComponent,
    TableToolbarComponent,
    TableToolbarActionsComponent,
    TableP13DialogComponent
} from '@fundamental-ngx/platform/table';
// FdpTableDataSource is a type alias only — use the concrete class from table-helpers:
import {
    ArrayTableDataSource,       // for static arrays
    ObservableTableDataSource,  // for observables
    TableInitialStateDirective, // REQUIRED — initializes state.columns from column definitions
    TableRowSelectionChangeEvent
} from '@fundamental-ngx/platform/table-helpers';
// NOTE: PlatformTableModule is deprecated — always import individual components above.

export interface [Name]Row {
    // map data model fields here
    id: number;
}

@Component({
    selector: 'app-[kebab-name]-table',
    templateUrl: './[kebab-name]-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TableComponent, TableColumnComponent, TableToolbarComponent, TableToolbarActionsComponent, TableP13DialogComponent,
              TableInitialStateDirective]
})
export class [Name]TableComponent {
    readonly dataSource = new ArrayTableDataSource<[Name]Row>(this._getData());
    readonly selectedRows = signal<[Name]Row[]>([]);

    onRowSelectionChange(event: TableRowSelectionChangeEvent<[Name]Row>): void {
        this.selectedRows.set(event.selection);
    }

    add(): void {
        // TODO: open a dialog or navigate to an add form
    }

    deleteSelected(): void {
        // TODO: call your service to delete this.selectedRows()
        this.selectedRows.set([]);
    }

    private _getData(): [Name]Row[] {
        // Replace with your observable or HTTP call:
        // return this._service.getItems();
        return [];
    }
}
```

### HTML Template (`.component.html`)

```html
<fdp-table
    [dataSource]="dataSource"
    selectionMode="multiple"
    [pageSize]="25"
    (rowSelectionChange)="onRowSelectionChange($event)"
>
    <fdp-table-toolbar title="[TableName]" [hideItemCount]="false">
        <fdp-table-toolbar-actions>
            <button fd-button fdType="emphasized" (click)="add()">Add</button>
            @if (selectedRows().length > 0) {
            <button fd-button fdType="negative" (click)="deleteSelected()">Delete ({{ selectedRows().length }})</button>
            }
        </fdp-table-toolbar-actions>
    </fdp-table-toolbar>

    <fdp-column name="name" key="name" label="Name" [sortable]="true" [filterable]="true"> </fdp-column>

    <!-- repeat fdp-column for each field -->

    <fdp-table-p13-dialog></fdp-table-p13-dialog>
</fdp-table>
```

### SCSS (`.component.scss`)

Leave empty — table layout is handled by `fundamental-styles`. Add rules only for host-level sizing (e.g., `height: 100%`).

### DataSource Patterns

Choose based on data origin:

| Source                               | Pattern                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Static array                         | `new ArrayTableDataSource(myArray)` — from `@fundamental-ngx/platform/table-helpers`            |
| Observable                           | `new ObservableTableDataSource(myObservable$)` — from `@fundamental-ngx/platform/table-helpers` |
| HTTP (lazy, server-side sort/filter) | Implement `TableDataSource<T>` interface — override `fetch(tableState)`                         |

For server-side sorting/filtering, implement `TableDataSource<T>`:

```typescript
export class [Name]DataSource extends TableDataSource<[Name]Row> {
    fetch(tableState?: TableState): Observable<[Name]Row[]> {
        const { sortBy, filterBy, page } = tableState ?? {};
        return this._service.query({ sortBy, filterBy, page });
    }
}
```

## Critical Rules

- **`TableInitialStateDirective` is required** — import it from `@fundamental-ngx/platform/table-helpers` and add it to the component's `imports` array. Its selector matches `fdp-table` and it initializes `state.columns` from the column definitions before the first render. Without it, `state.columns` stays `[]` and the table shows "Right now, there are no visible columns." even though the `fdp-column` elements are correctly declared.
- **Import individual components, not `PlatformTableModule`** — `PlatformTableModule` is deprecated and cannot be statically resolved in a standalone component's `imports` array. Always import `TableComponent`, `TableColumnComponent`, `TableToolbarComponent`, `TableToolbarActionsComponent`, and `TableP13DialogComponent` directly from `@fundamental-ngx/platform/table`.
- **`FdpTableDataSource` is a type alias, not a class** — it lives in `@fundamental-ngx/platform/table-helpers` and is exported under `export type`. Use `ArrayTableDataSource` for static arrays or `ObservableTableDataSource` for observables; both are in `@fundamental-ngx/platform/table-helpers`.
- **`TableRowSelectionChangeEvent` is from `table-helpers`** — import it from `@fundamental-ngx/platform/table-helpers`, not `@fundamental-ngx/platform/table`.
- **There are no `fdpTableSortable` / `fdpTableFilterable` directives** — sort and filter are activated solely by `[sortable]="true"` and `[filterable]="true"` on each `fdp-column`. No extra directive goes on `<fdp-table>`.
- **`[pageSizeOptions]` does not exist** — `[pageSize]` is the only pagination input on `<fdp-table>`. There is no per-page picker input.
- **`fdp-table-p13-dialog` is required** — without it, the column personalization panel and the sort/filter apply buttons do not render; include it inside `<fdp-table>` even when not explicitly requested
- **`name` and `key` are both required on `fdp-column`** — `name` is the unique identifier (camelCase), `key` maps to the data row's property path; they can be identical
- **Do NOT pass a `BehaviorSubject` directly** — wrap it: `new ObservableTableDataSource(subject.asObservable())`; passing a subject directly causes double-subscription issues
- **`selectionMode` is a string input** — values: `'single'` | `'multiple'` | `'none'`; do not use `[selectionMode]="SelectionMode.Multiple"` enum binding unless you import the enum
- **Bundle budget** — adding `@fundamental-ngx/platform` increases the initial bundle to ~4.6 MB. In a standalone app raise the budget in `angular.json` to `maximumWarning: "5MB", maximumError: "8MB"`.
- **Custom cell templates use `fdpTableCell` structural directive** — `<ng-template fdpTableCell let-row>{{ row.date | date }}</ng-template>` inside the `fdp-column`
- Do NOT add `standalone: true` — default since Angular 19
- Do NOT use `*ngIf` / `*ngFor` in templates — use `@if` / `@for`

## Phase 5: Validate

```bash
# NX monorepo
nx run <project>:build

# Standalone Angular CLI app
ng build   # or: npm run build
```

Replace the empty `_getData()` return with at least a small static array and confirm the table renders with column headers before reporting done.

## Output

```
## Build Table: [TableName]

**Files generated:**
- src/app/.../[kebab-name]-table.component.ts
- src/app/.../[kebab-name]-table.component.html
- src/app/.../[kebab-name]-table.component.scss

**Imports required in parent:**
- `import { [Name]TableComponent } from './[kebab-name]-table/[kebab-name]-table.component'`
- Note: `TableInitialStateDirective` is declared inside the generated component — no additional parent import needed

**Features implemented:** sort ✓ | filter ✓ | paginate(25/page) ✓ | select(multiple) ✓

**Next steps:**
- [ ] Replace static array in _getData() with your real service call
- [ ] Add custom cell templates (fdpTableCell) for date/currency/status columns
- [ ] For >10k rows: implement server-side TableDataSource with fetch() method
- [ ] Add row-level action column if inline edit/delete is needed
```
