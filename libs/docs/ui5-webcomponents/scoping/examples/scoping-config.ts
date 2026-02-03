/**
 * This module MUST be imported before any UI5 Web Components are used.
 * It configures the custom elements scoping suffix for all UI5 Web Components.
 *
 * Example usage in main.ts:
 * import './scoping-config.ts'; // Must be first!
 * import { bootstrapApplication } from '@angular/platform-browser';
 * import { AppComponent } from './app/app.component';
 */

import {
    setCustomElementsScopingRules,
    setCustomElementsScopingSuffix
} from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

/**
 * Set the scoping suffix for all UI5 Web Components.
 *
 * This is useful when:
 * - Building libraries or micro-frontends
 * - Multiple versions of UI5 Web Components may coexist
 * - You want to avoid naming conflicts with other libraries
 *
 * The suffix will be appended to all ui5-* custom element names.
 * Example: <ui5-button> becomes <ui5-button-myapp>
 */
export function initializeScopedUI5Components(suffix: string): void {
    setCustomElementsScopingSuffix(suffix);

    // Optional: Fine-tune which components are scoped
    // This example scopes all ui5-* components except custom ones
    setCustomElementsScopingRules({
        include: [/^ui5-/],
        exclude: [/^ui5-custom-/] // Don't scope custom components
    });
}

// For this example, we'll use 'demo' as the suffix
initializeScopedUI5Components('demo');
