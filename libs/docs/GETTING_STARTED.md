# Fundamental NGX

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Overview

Fundamental NGX is the SAP set of Angular component libraries implementing the SAP Design System. Build modern, enterprise-grade applications with the SAP look and feel.

## Packages

| Package                                      | Description                                             | Install                                                |
| -------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| **@fundamental-ngx/ui5-webcomponents**       | Angular wrappers for UI5 Web Components                 | `npm install @fundamental-ngx/ui5-webcomponents`       |
| **@fundamental-ngx/ui5-webcomponents-fiori** | Angular wrappers for UI5 Web Components Fiori           | `npm install @fundamental-ngx/ui5-webcomponents-fiori` |
| **@fundamental-ngx/ui5-webcomponents-ai**    | Angular wrappers for UI5 Web Components AI              | `npm install @fundamental-ngx/ui5-webcomponents-ai`    |
| **@fundamental-ngx/core**                    | Core components built on Fundamental Library Styles     | `ng add @fundamental-ngx/core`                         |
| **@fundamental-ngx/platform**                | Higher-level components with built-in data binding      | `ng add @fundamental-ngx/platform`                     |
| **@fundamental-ngx/cdk**                     | Utilities and directives for building custom components | `ng add @fundamental-ngx/cdk`                          |
| **@fundamental-ngx/btp**                     | BTP-specific components and patterns                    | `ng add @fundamental-ngx/btp`                          |
| **@fundamental-ngx/cx**                      | Customer Experience components                          | `ng add @fundamental-ngx/cx`                           |
| **@fundamental-ngx/i18n**                    | Internationalization with 37+ languages                 | `npm install @fundamental-ngx/i18n`                    |

## Requirements

- **Node.js**: LTS version recommended
- **Angular**: Version 21 or newer
- **npm**: Included with Node.js

## Quick Start

### 1. Install a Package

```bash
ng add @fundamental-ngx/core
```

### 2. Import Components

```typescript
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';

@Component({
    selector: 'app-example',
    imports: [ButtonComponent, CheckboxComponent],
    template: `
        <button fd-button label="Click Me"></button>
        <fd-checkbox label="Accept terms"></fd-checkbox>
    `
})
export class ExampleComponent {}
```

### 3. Configure Theming

```typescript
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';

export const appConfig: ApplicationConfig = {
    providers: [provideTheming({ defaultTheme: 'sap_horizon' }), themingInitializer()]
};
```

## Package Details

### Core (`@fundamental-ngx/core`)

The foundational UI component library built using [Fundamental Library Styles](https://sap.github.io/fundamental-styles/). Includes buttons, forms, dialogs, tables, and 80+ components.

```typescript
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
// Or import individual components
import { ButtonComponent } from '@fundamental-ngx/core/button';
```

### Platform (`@fundamental-ngx/platform`)

Higher-level components with advanced features like built-in data binding, form generation, and complex layouts.

```typescript
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';
```

### CDK (`@fundamental-ngx/cdk`)

Component Development Kit providing utilities for building custom components:

- DataSource patterns
- ControlValueAccessor helpers
- Focusable/selectable list helpers
- RxJS subscription management

```typescript
import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
```

### i18n (`@fundamental-ngx/i18n`)

Centralized internationalization with:

- Pre-compiled translations for 37+ languages
- Runtime translation switching
- Type-safe translation keys
- `FdTranslatePipe` for templates

```typescript
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH, FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';
```

### UI5 Web Components (`@fundamental-ngx/ui5-webcomponents`)

Angular wrappers for [@ui5/webcomponents](https://www.npmjs.com/package/@ui5/webcomponents):

```typescript
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

@Component({
    imports: [Button],
    template: `<ui5-button (ui5Click)="handleClick()">Click Me</ui5-button>`
})
```

## Essential Services

### RTL Support

```typescript
import { RtlService } from '@fundamental-ngx/cdk/utils';

@NgModule({
    providers: [RtlService]
})
```

### Content Density

```typescript
import { provideContentDensity } from '@fundamental-ngx/core/content-density';

providers: [provideContentDensity({ storage: 'localStorage' })];
```

## Resources

- [GitHub Repository](https://github.com/SAP/fundamental-ngx)
- [Full Installation Guide](https://github.com/SAP/fundamental-ngx/wiki/Full-Installation-Guide)
- [Breaking Changes](https://github.com/SAP/fundamental-ngx/wiki#breaking-changes)

## Support

If you encounter an issue, [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## Contributing

See [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md) for guidelines.

---

## Adding Documentation for a New Component

For contributors adding component documentation, see the checklist below.

### Quick Checklist

#### 1. Create docs folder

📁 `libs/docs/{package}/{component-name}/`

```
{component-name}/
├── index.ts                        # Route exports
├── {component}-docs.component.ts   # Main docs page
├── {component}-docs.component.html # Docs template
├── {component}-header/             # Header component
│   └── {component}-header.component.ts
├── examples/                       # Example components
│   └── {component}-example.component.ts
├── project.json
└── tsconfig.json
```

#### 2. Register in navigation

📄 `libs/docs/{package}/docs-data.json`

```json
{
    "components": [{ "url": "core/my-component", "name": "My Component" }]
}
```

#### 3. Register route

📄 `libs/docs/{package}/docs-routes.ts`

```typescript
const componentRoutes = [
    {
        path: 'my-component',
        loadChildren: () => import('@fundamental-ngx/docs/core/my-component').then(configureLibRoutes)
    }
];
```

#### 4. Add API reference

📄 `libs/docs/{package}/api-files.ts`

```typescript
export const API_FILES = {
    myComponent: ['MyComponentComponent', 'MyComponentDirective']
};
```

#### 5. Create content

**`index.ts`** - Define routes and metadata:

```typescript
import { Routes } from '@angular/router';
import { MyComponentDocsComponent } from './my-component-docs.component';
import { MyComponentHeaderComponent } from './my-component-header/my-component-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MyComponentHeaderComponent,
        children: [{ path: '', component: MyComponentDocsComponent }],
        data: { primary: true }
    }
];
export const LIBRARY_NAME = 'my-component';
export const API_FILE_KEY = 'myComponent';
```

**`examples/{component}-example.component.ts`** - Create example components:

```typescript
@Component({
    selector: 'fd-my-component-basic-example',
    template: `<fd-my-component>Hello</fd-my-component>`,
    imports: [MyComponentComponent]
})
export class MyComponentBasicExampleComponent {}
```

**`{component}-docs.component.ts`** - Import examples and define files:

```typescript
@Component({
    selector: 'app-my-component',
    templateUrl: './my-component-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        MyComponentBasicExampleComponent
    ]
})
export class MyComponentDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('my-component-basic-example.component.ts'),
        getExampleFile('my-component-basic-example.component.html')
    ];
}
```

## Running the Documentation App

```bash
# Install dependencies
yarn install

# Start the docs app (all packages)
yarn start

# Start with a specific package only
npx nx serve docs --configuration=core
```

Navigate to `http://localhost:4200` to view the documentation.
