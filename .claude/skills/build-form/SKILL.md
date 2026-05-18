---
name: build-form
description: Build a reactive form with @fundamental-ngx/platform form components, FormGroup wiring, validation, and error states
argument-hint: <form-name> [field:type ...]
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(nx *), Bash(ng build*), Write, Edit
---

# Build Form: $ARGUMENTS

If `$ARGUMENTS` is empty, ask the user: (1) what the form is for, (2) which fields it needs, (3) whether validation is required.

## Phase 1: Determine Scope

Parse from `$ARGUMENTS` or ask:

- **Form name** (PascalCase, e.g., `UserProfile`, `ShippingAddress`)
- **Fields**: name, type (`text` | `number` | `select` | `date` | `checkbox` | `textarea`), required (default) or optional (suffix with `?`, e.g., `birthDate:date?`)
- **Layout**: `1` column | `2` columns (default) | `3` columns
- **Submit target**: inline handler, emitted event to parent, or none

## Phase 2: Gather Component Context

Call the `@fundamental-ngx/mcp` MCP server:

1. `get_usage_guide('form')` — composition order, `fdp-form-group` vs `fd-form-item` decision tree, pitfalls
2. `get_component_api('fdp-form-group')` — layout inputs, `(onSubmit)` output
3. `get_component_api('fdp-form-field')` — `[id]`, `[label]`, `[required]`, `[columns]`, hint/error slots
4. For each non-text field: `get_component_api` for its control (e.g., `fdp-select`, `fdp-date-picker`, `fdp-checkbox`)

If MCP is unavailable, read `libs/mcp-server/src/data/usage-guides.ts`.

## Phase 3: Present Plan

Output this table before writing any code:

```
## Form Plan: [FormName]

**Layout:** 2 columns  |  **Validation trigger:** on submit + on touched

| Field | Control | Required | Validators |
|-------|---------|----------|------------|
| firstName | fdp-input | yes | minLength(2) |
| role | fdp-select | yes | required |
| birthDate | fdp-date-picker | no | — |
```

**Stop here and wait for approval before generating code.**

## Phase 4: Generate Component

Create three files in the target path (ask the user if not already known).

Also generate the fields interface at the top of the `.component.ts` file:

```typescript
export interface [Name]Fields {
    // one property per form field, e.g.:
    firstName: string;
    role: string;
}
```

### TypeScript (`.component.ts`)

Import each platform form component directly — they are all standalone. There is no barrel `PlatformFormModule` to import.

```typescript
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import {
    FormFieldComponent,
    FormFieldErrorDirective,
    FormGroupComponent,
    InputComponent
    // Add per-field: SelectComponent, TextAreaComponent, etc.
} from '@fundamental-ngx/platform/form';
// Import OptionItem only when using fdp-select:
// import { OptionItem } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'app-[kebab-name]-form',
    templateUrl: './[kebab-name]-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FormGroupComponent,
        FormFieldComponent,
        FormFieldErrorDirective,  // always required when any field has validators
        InputComponent,
        // SelectComponent, TextAreaComponent, etc.
        ButtonModule
    ]
})
export class [Name]FormComponent {
    readonly submitted = output<[Name]Fields>();

    private readonly _fb = inject(FormBuilder);

    form: FormGroup = this._fb.group({
        // fieldName: [defaultValue, [Validators.required, ...]]
    });

    onSubmit(): void {
        if (this.form.valid) {
            this.submitted.emit(this.form.getRawValue() as [Name]Fields);
        }
    }
}
```

**Standalone component imports reference:**

| Template element                         | Import from `@fundamental-ngx/platform/form` |
| ---------------------------------------- | -------------------------------------------- |
| `fdp-form-group`                         | `FormGroupComponent`                         |
| `fdp-form-field`                         | `FormFieldComponent`                         |
| `fdp-input`                              | `InputComponent`                             |
| `fdp-select`                             | `SelectComponent`                            |
| `fdp-textarea`                           | `TextAreaComponent`                          |
| `fdp-date-picker`                        | `PlatformDatePickerComponent`                |
| `fdp-checkbox`                           | `CheckboxComponent`                          |
| `fdpFormFieldError` (template directive) | `FormFieldErrorDirective`                    |

### HTML Template (`.component.html`)

Wrap everything in a native `<form>` — `FormGroupComponent` does NOT render a `<form>` tag by default (`useForm` defaults to `false`) and has no footer slot. Submit/reset buttons must be placed **outside** `<fdp-form-group>` but inside the `<form>`.

Use `columnLayout="XL2-L2-M2-S1"` for a 2-column layout (not `[layout]`).

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <fdp-form-group [formGroup]="form" columnLayout="XL2-L2-M2-S1">
        <!--
          Error message templates — shared across ALL fields in this group.
          Required whenever any fdp-form-field has [required]="true" or its
          FormControl carries validators. Omitting these causes a runtime error:
          "Validation strings are required for the any provided validations."
          Add one <ng-template> per Angular error key your validators produce.
        -->
        <ng-template fdpFormFieldError="required">This field is required</ng-template>
        <ng-template fdpFormFieldError="minlength" let-error
            >Minimum {{ error.requiredLength }} characters required</ng-template
        >
        <ng-template fdpFormFieldError="email">Please enter a valid email address</ng-template>
        <!-- add more for maxlength, pattern, custom validators, etc. -->

        <fdp-form-field id="firstName" label="First Name" [required]="true" [column]="1">
            <fdp-input name="firstName" [formControlName]="'firstName'"></fdp-input>
        </fdp-form-field>

        <!-- repeat fdp-form-field blocks for each field -->
    </fdp-form-group>

    <!-- Buttons go here, outside fdp-form-group but inside <form> -->
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem">
        <button fd-button fdType="emphasized" type="submit">Submit</button>
        <button fd-button fdType="transparent" type="button" (click)="form.reset()">Reset</button>
    </div>
</form>
```

**`fdp-select` usage** — use `[list]` with `OptionItem[]` from `@fundamental-ngx/platform/shared`. Each item's `.value` is what gets written to the `FormControl`:

```html
<fdp-form-field id="role" label="Role" [required]="true" [column]="2">
    <fdp-select name="role" [formControlName]="'role'" [list]="roleOptions"> </fdp-select>
</fdp-form-field>
```

```typescript
import { OptionItem } from '@fundamental-ngx/platform/shared';

readonly roleOptions: OptionItem[] = [
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
];
```

### SCSS (`.component.scss`)

Leave empty — form spacing and layout are handled by `fundamental-styles`. Only add custom rules if product requirements demand it.

## Critical Rules

- **`fdpFormFieldError` templates are mandatory when any field has validators** — if `[required]="true"` is set on any `fdp-form-field`, or its `FormControl` carries validators, the component throws at runtime: `"Validation strings are required for the any provided validations."` Fix: add `<ng-template fdpFormFieldError="required">...</ng-template>` (and one per additional error key) as direct children of `fdp-form-group`. They are shared automatically by all fields. Import `FormFieldErrorDirective` from `@fundamental-ngx/platform/form`.
- **One `<ng-template fdpFormFieldError>` per Angular error key** — add templates for every key your validators can produce: `required`, `minlength`, `maxlength`, `email`, `pattern`, and any custom keys. The template context (`let-error`) exposes the error value (e.g. `error.requiredLength` for `minlength`).
- **Import standalone components directly** — there is no `PlatformFormModule`. Import each component individually: `FormGroupComponent`, `FormFieldComponent`, `FormFieldErrorDirective`, `InputComponent`, `SelectComponent`, `TextAreaComponent`, etc.
- **`fdp-form-field` not `fdp-form-item`** — `fdp-form-item` is the core `fd-` API; platform forms use `fdp-form-field`
- **Wrap in `<form (ngSubmit)>`, NOT `(fdSubmit)` on `fdp-form-group`** — `fdp-form-group` does not emit `fdSubmit`. Use a standard `<form [formGroup]="form" (ngSubmit)="onSubmit()">` wrapper. The component's own `(onSubmit)` output fires only when `[useForm]="true"` is set.
- **`columnLayout` (string), NOT `[layout]` (object)** — `FormGroupComponent` accepts `columnLayout="XL2-L2-M2-S1"`, not `[layout]="{ columns: 2 }"`. The format is `XLn-Ln-Mn-Sn`.
- **No `[fdpFormFooter]` directive** — it does not exist. Place buttons outside `<fdp-form-group>` but inside your `<form>` wrapper.
- **`[list]` (not `[options]`) on `fdp-select`** — pass `OptionItem[]` to `[list]`. Do NOT use `[options]`, `displayKey`, or `valueKey` — these inputs do not exist on `SelectComponent`.
- **`[id]` on `fdp-form-field` is required** — it sets the `for` on the label and the `id` on the inner control via content projection; omitting it breaks label–control association and accessibility
- **`name` attribute on every control** — must be unique within the form; matches the `FormControlName`
- **`[column]` (singular) not `[columns]`** — `fdp-form-field` uses `[column]` to set which column it occupies in the grid; `[columns]` is the span count
- Do NOT add `standalone: true` — default since Angular 19
- Do NOT use `ngClass` or `ngStyle` — use direct class/style bindings

## Phase 5: Validate

```bash
nx run <project>:build   # or: ng build
```

Fix any TypeScript type errors or missing import errors before reporting done.

## Output

```
## Build Form: [FormName]

**Files generated:**
- src/app/.../[kebab-name]-form.component.ts
- src/app/.../[kebab-name]-form.component.html
- src/app/.../[kebab-name]-form.component.scss

**Imports required in parent:**
- `import { [Name]FormComponent } from './[kebab-name]-form/[kebab-name]-form.component'`

**Next steps:**
- [ ] Add [Name]FormComponent to the parent's imports array
- [ ] Handle the (submitted) output event in the parent
- [ ] Customize per-field error messages with fdp-form-message if default messages are insufficient
- [ ] For multi-step forms, wrap multiple fdp-form-group instances in a wizard container
```
