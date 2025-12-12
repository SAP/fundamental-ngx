# ui5-webcomponents-fiori

Angular component wrappers around the [@ui5/webcomponents-fiori](https://www.npmjs.com/package/@ui5/webcomponents-fiori) npm package.

## Overview

This library provides Angular components that wrap UI5 Fiori Web Components, enabling you to build SAP Fiori-compliant applications with Angular. These components include higher-level patterns and layouts specific to enterprise applications.

- Angular-friendly API (inputs, outputs, template syntax)
- TypeScript type definitions
- Full integration with Angular's change detection
- Standalone components support
- SAP Fiori design guidelines compliance

## Installation

```bash
npm install @fundamental-ngx/ui5-webcomponents-fiori
```

## Usage

Import the Fiori components you need:

```typescript
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { DynamicPage } from '@fundamental-ngx/ui5-webcomponents-fiori/dynamic-page';
import { Timeline } from '@fundamental-ngx/ui5-webcomponents-fiori/timeline';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ShellBar, DynamicPage, Timeline],
  template: `
    <ui5-shellbar
      primary-title="My App"
      (profile-click)="handleProfile()">
    </ui5-shellbar>
    <ui5-dynamic-page>
      <!-- Page content -->
    </ui5-dynamic-page>
  `
})
export class ExampleComponent {
  handleProfile() {
    console.log('Profile clicked!');
  }
}
```

### Using Angular Components Inside UI5 Components

Angular components often use selectors with hyphens (e.g. `<app-item>`, `<app-value>`).
UI5 interprets such tags as custom elements and may wait **up to 1 second** for their registration, causing delayed rendering inside components like `<ui5-table-cell>`.

To avoid this, configure UI5 to ignore Angular component prefixes:

```ts
// ui5-init.ts
import { ignoreCustomElements } from '@ui5/webcomponents-base/dist/IgnoreCustomElements.js';

ignoreCustomElements('app-');
```

Import it before Angular bootstraps:
```ts
// main.ts
import './ui5-init';
```

This prevents unnecessary waiting, ensures smooth rendering, and improves performance when mixing Angular components with UI5 Web Components.

## Resources

- [UI5 Web Components Documentation](https://ui5.github.io/webcomponents/)
- [Fundamental NGX Documentation](https://sap.github.io/fundamental-ngx)
- [GitHub Repository](https://github.com/SAP/fundamental-ngx)
