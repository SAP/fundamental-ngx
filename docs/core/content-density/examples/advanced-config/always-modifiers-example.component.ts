import { Component, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

/**
 * Example component demonstrating alwaysAddModifiers configuration.
 * When alwaysAddModifiers is true, CSS modifier classes are always applied
 * to the host element, regardless of whether the density is in the supported list.
 */
@Component({
    selector: 'fd-docs-always-modifiers-example',
    template: `
        <div class="modifiers-example">
            <span>Current density: </span>
            <span fd-object-status [inverted]="true" [label]="_observer.contentDensity()"></span>
            <p class="modifiers-example__hint">
                This component always has CSS classes applied (check with DevTools):
                <code>is-compact</code>, <code>is-cozy</code>, or <code>is-condensed</code>
            </p>
        </div>
    `,
    styles: [
        `
            .modifiers-example {
                padding: 1rem;
                border: 1px dashed var(--sapNeutralBorderColor);
                border-radius: 4px;
            }
            .modifiers-example__hint {
                margin-top: 0.5rem;
                font-size: 0.875rem;
                color: var(--sapNeutralTextColor);
            }
            .modifiers-example__hint code {
                background: var(--sapBackgroundColor);
                padding: 0.125rem 0.25rem;
                border-radius: 2px;
            }
        `
    ],
    providers: [
        contentDensityObserverProviders({
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
            defaultContentDensity: ContentDensityMode.COZY,
            // Always add modifier classes to the host element
            alwaysAddModifiers: true
        })
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [ObjectStatusComponent]
})
export class AlwaysModifiersExampleComponent {
    constructor(readonly _observer: ContentDensityObserver) {}
}
