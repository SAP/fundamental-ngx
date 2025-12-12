# ui5-webcomponents-ai

Angular component wrappers around the [@ui5/webcomponents-ai](https://www.npmjs.com/package/@ui5/webcomponents-ai) npm package.

## Overview

This library provides Angular components that wrap UI5 AI Web Components, bringing AI-powered UI elements to your Angular applications. These components integrate AI features like prompt inputs and AI-enhanced buttons with Angular's change detection and template syntax.

- Angular-friendly API (inputs, outputs, template syntax)
- TypeScript type definitions
- Full integration with Angular's change detection
- Standalone components support

## Installation

```bash
npm install @fundamental-ngx/ui5-webcomponents-ai
```

## Usage

Import the AI components you need:

```typescript
import { Button } from '@fundamental-ngx/ui5-webcomponents-ai/button';
import { PromptInput } from '@fundamental-ngx/ui5-webcomponents-ai/prompt-input';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, PromptInput],
  template: `
    <ui5-ai-button (click)="handleAIAction()">AI Action</ui5-ai-button>
    <ui5-prompt-input [(value)]="prompt"></ui5-prompt-input>
  `
})
export class ExampleComponent {
  prompt = '';
  
  handleAIAction() {
    console.log('AI button clicked!');
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
