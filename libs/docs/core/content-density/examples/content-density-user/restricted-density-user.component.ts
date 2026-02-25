import { Component, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

/**
 * Example component that restricts child content density.
 * Children will always inherit this component's density, regardless of their own directives.
 */
@Component({
    selector: 'fd-docs-restricted-density-user',
    template: `
        <ng-content></ng-content>
        <span
            fd-object-status
            class="example-component__object-status"
            [inverted]="true"
            [label]="_contentDensityObserver.contentDensity()"
        ></span>
    `,
    styleUrls: ['./content-density-user.component.scss'],
    host: {
        class: 'example-component example-component--restricted',
        '[class.is-compact]': '_contentDensityObserver.isCompactSignal()',
        '[class.is-cozy]': '_contentDensityObserver.isCozySignal()',
        '[class.is-condensed]': '_contentDensityObserver.isCondensedSignal()'
    },
    providers: [
        contentDensityObserverProviders({
            supportedContentDensity: [
                ContentDensityMode.COMPACT,
                ContentDensityMode.COZY,
                ContentDensityMode.CONDENSED
            ],
            defaultContentDensity: ContentDensityMode.COZY,
            restrictChildContentDensity: true
        })
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [ObjectStatusComponent]
})
export class RestrictedDensityUserComponent {
    constructor(readonly _contentDensityObserver: ContentDensityObserver) {}
}
