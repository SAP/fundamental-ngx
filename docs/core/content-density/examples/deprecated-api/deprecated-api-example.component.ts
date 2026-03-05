import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { Subscription } from 'rxjs';

/**
 * Example demonstrating deprecated Observable APIs alongside the new Signal APIs.
 * This is useful for understanding migration paths from RxJS to Signals.
 *
 * DEPRECATED APIs (still work but prefer signals):
 * - isCompact$ → use isCompactSignal()
 * - isCozy$ → use isCozySignal()
 * - isCondensed$ → use isCondensedSignal()
 * - contentDensity$$ → use contentDensity()
 * - value getter → use contentDensity()
 * - subscribe() → use effect() with signals
 * - asObservable() → use toObservable() from @angular/core/rxjs-interop if needed
 */
@Component({
    selector: 'fd-docs-deprecated-api-example',
    template: `
        <div class="deprecated-example">
            <h5>Signal API (Recommended)</h5>
            <ul class="api-list">
                <li>
                    <code>contentDensity()</code>:
                    <span fd-object-status [inverted]="true" [label]="_observer.contentDensity()"></span>
                </li>
                <li><code>isCompactSignal()</code>: {{ _observer.isCompactSignal() }}</li>
                <li><code>isCozySignal()</code>: {{ _observer.isCozySignal() }}</li>
                <li><code>isCondensedSignal()</code>: {{ _observer.isCondensedSignal() }}</li>
            </ul>

            <h5 style="margin-top: 1rem">Deprecated Observable API</h5>
            <ul class="api-list api-list--deprecated">
                <li><code>value</code> (getter): {{ _observer.value }}</li>
                <li><code>isCompact</code> (getter): {{ _observer.isCompact }}</li>
                <li><code>isCozy</code> (getter): {{ _observer.isCozy }}</li>
                <li><code>isCondensed</code> (getter): {{ _observer.isCondensed }}</li>
            </ul>

            <p class="deprecated-example__hint">
                The Observable APIs (<code>isCompact$</code>, <code>isCozy$</code>, etc.) are deprecated. Migrate to the
                Signal APIs for better performance and simpler code.
            </p>
        </div>
    `,
    styles: [
        `
            .deprecated-example {
                padding: 1rem;
                border: 1px dashed var(--sapNeutralBorderColor);
                border-radius: 4px;
            }
            .deprecated-example h5 {
                margin: 0 0 0.5rem 0;
                font-size: 0.875rem;
            }
            .api-list {
                margin: 0 0 0.5rem 0;
                padding-left: 1.5rem;
            }
            .api-list li {
                margin-bottom: 0.25rem;
            }
            .api-list code {
                background: var(--sapBackgroundColor);
                padding: 0.125rem 0.25rem;
                border-radius: 2px;
                font-size: 0.8125rem;
            }
            .api-list--deprecated code {
                text-decoration: line-through;
                opacity: 0.7;
            }
            .deprecated-example__hint {
                margin-top: 1rem;
                font-size: 0.875rem;
                color: var(--sapNeutralTextColor);
                padding: 0.5rem;
                background: var(--sapWarningBackground);
                border-radius: 4px;
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
            defaultContentDensity: ContentDensityMode.COZY
        })
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [ObjectStatusComponent]
})
export class DeprecatedApiExampleComponent implements OnDestroy {
    private _subscription?: Subscription;

    constructor(readonly _observer: ContentDensityObserver) {
        // Example of deprecated subscribe() usage - prefer effect() with signals instead
        // this._subscription = this._observer.subscribe({
        //     next: (density) => console.log('Density changed:', density)
        // });
    }

    ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    }
}
