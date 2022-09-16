import { Component, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-docs-content-density-user',
    template: `
        <ng-content></ng-content>
        <span fd-object-status class="example-component__object-status" [inverted]="true">
            {{ _contentDensityObserver | async }}
        </span>
    `,
    styleUrls: ['./content-density-user.component.scss'],
    host: {
        class: 'example-component'
    },
    providers: [
        contentDensityObserverProviders({
            modifiers: {
                [ContentDensityMode.COMPACT]: 'example-component--compact',
                [ContentDensityMode.CONDENSED]: 'example-component--condensed'
            },
            supportedContentDensity: [
                ContentDensityMode.COMPACT,
                ContentDensityMode.COZY,
                ContentDensityMode.CONDENSED
            ],
            defaultContentDensity: ContentDensityMode.COMPACT
        })
    ],
    encapsulation: ViewEncapsulation.None
})
export class ContentDensityUserComponent {
    constructor(readonly _contentDensityObserver: ContentDensityObserver) {
        _contentDensityObserver.subscribe();
    }
}
