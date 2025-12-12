# ui5-webcomponents

Angular component wrappers around the [@ui5/webcomponents](https://www.npmjs.com/package/@ui5/webcomponents) npm package.

## Overview

This library provides Angular components that wrap UI5 Web Components, allowing you to use UI5's powerful web components seamlessly within your Angular applications. Each Angular component corresponds to a UI5 Web Component and provides:

- Angular-friendly API (inputs, outputs, template syntax)
- TypeScript type definitions
- Full integration with Angular's change detection
- Standalone components support

## Installation

```bash
npm install @fundamental-ngx/ui5-webcomponents
```

## Usage

Import the components you need directly:

```typescript
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Input],
  template: `
    <ui5-button (click)="handleClick()">Click Me</ui5-button>
    <ui5-input [(value)]="inputValue"></ui5-input>
  `
})
export class ExampleComponent {
  inputValue = '';
  
  handleClick() {
    console.log('Button clicked!');
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
