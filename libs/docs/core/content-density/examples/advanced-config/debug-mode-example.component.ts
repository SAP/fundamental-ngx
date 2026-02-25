import { Component, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

/**
 * Example component demonstrating debug mode.
 * When debug is enabled, density changes are logged to the console.
 * This is useful for troubleshooting inheritance and configuration issues.
 */
@Component({
    selector: 'fd-docs-debug-mode-example',
    template: `
        <div class="debug-example">
            <span>Current density: </span>
            <span fd-object-status [inverted]="true" [label]="_observer.contentDensity()"></span>
            <p class="debug-example__hint">Open browser console to see debug logs when density changes</p>
        </div>
    `,
    styles: [
        `
            .debug-example {
                padding: 1rem;
                border: 1px dashed var(--sapNeutralBorderColor);
                border-radius: 4px;
            }
            .debug-example__hint {
                margin-top: 0.5rem;
                font-size: 0.875rem;
                color: var(--sapNeutralTextColor);
            }
        `
    ],
    providers: [
        contentDensityObserverProviders({
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
            defaultContentDensity: ContentDensityMode.COZY,
            // Enable debug mode to log density changes to console
            debug: true
        })
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [ObjectStatusComponent]
})
export class DebugModeExampleComponent {
    constructor(readonly _observer: ContentDensityObserver) {}
}
