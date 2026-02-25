import { Component } from '@angular/core';
import { GlobalContentDensityService, provideContentDensity } from '@fundamental-ngx/core/content-density';
import { AlwaysModifiersExampleComponent } from './always-modifiers-example.component';
import { CustomModifiersExampleComponent } from './custom-modifiers-example.component';
import { DebugModeExampleComponent } from './debug-mode-example.component';

@Component({
    selector: 'fd-advanced-config-example',
    template: `
        <h4>Debug Mode</h4>
        <p class="description">Enable debug logging to troubleshoot density inheritance:</p>
        <fd-docs-debug-mode-example></fd-docs-debug-mode-example>

        <h4 style="margin-top: 1.5rem">Always Add Modifiers</h4>
        <p class="description">Always apply CSS modifier classes, even when not strictly required:</p>
        <fd-docs-always-modifiers-example></fd-docs-always-modifiers-example>

        <h4 style="margin-top: 1.5rem">Custom Modifier Classes</h4>
        <p class="description">Use custom CSS class names instead of the default <code>is-*</code> pattern:</p>
        <fd-docs-custom-modifiers-example></fd-docs-custom-modifiers-example>
    `,
    styles: [
        `
            .description {
                margin-bottom: 0.75rem;
                color: var(--sapTextColor);
            }
            .description code {
                background: var(--sapBackgroundColor);
                padding: 0.125rem 0.25rem;
                border-radius: 2px;
            }
        `
    ],
    imports: [DebugModeExampleComponent, AlwaysModifiersExampleComponent, CustomModifiersExampleComponent],
    providers: [GlobalContentDensityService, provideContentDensity()]
})
export class AdvancedConfigExampleComponent {}
