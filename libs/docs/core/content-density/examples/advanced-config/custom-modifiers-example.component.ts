import { Component, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

/**
 * Example component demonstrating custom CSS modifier classes.
 * By default, the modifiers are 'is-compact', 'is-cozy', and 'is-condensed'.
 * You can customize these to match your project's CSS naming convention.
 */
@Component({
    selector: 'fd-docs-custom-modifiers-example',
    template: `
        <div class="custom-modifiers-example">
            <span>Current density: </span>
            <span fd-object-status [inverted]="true" [label]="_observer.contentDensity()"></span>
            <p class="custom-modifiers-example__hint">
                This component uses custom CSS classes (check with DevTools):
                <code>density--compact</code>, <code>density--cozy</code>, or <code>density--condensed</code>
            </p>
        </div>
    `,
    styles: [
        `
            .custom-modifiers-example {
                padding: 1rem;
                border: 1px dashed var(--sapNeutralBorderColor);
                border-radius: 4px;
            }
            .custom-modifiers-example__hint {
                margin-top: 0.5rem;
                font-size: 0.875rem;
                color: var(--sapNeutralTextColor);
            }
            .custom-modifiers-example__hint code {
                background: var(--sapBackgroundColor);
                padding: 0.125rem 0.25rem;
                border-radius: 2px;
            }
            /* Custom density classes */
            :host.density--compact {
                --example-padding: 0.25rem;
            }
            :host.density--cozy {
                --example-padding: 0.5rem;
            }
            :host.density--condensed {
                --example-padding: 0.125rem;
            }
        `
    ],
    providers: [
        contentDensityObserverProviders({
            supportedContentDensity: [
                ContentDensityMode.COMPACT,
                ContentDensityMode.COZY,
                ContentDensityMode.CONDENSED
            ],
            defaultContentDensity: ContentDensityMode.COZY,
            // Custom CSS class names for each density mode
            modifiers: {
                [ContentDensityMode.COMPACT]: 'density--compact',
                [ContentDensityMode.COZY]: 'density--cozy',
                [ContentDensityMode.CONDENSED]: 'density--condensed'
            }
        })
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [ObjectStatusComponent]
})
export class CustomModifiersExampleComponent {
    constructor(readonly _observer: ContentDensityObserver) {}
}
