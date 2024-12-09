import { AsyncPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-docs-content-density-user',
    template: `
        <ng-content></ng-content>
        <span
            fd-object-status
            class="example-component__object-status"
            [inverted]="true"
            [label]="_contentDensityObserver | async"
        ></span>
    `,
    styleUrls: ['./content-density-user.component.scss'],
    host: {
        class: 'example-component'
    },
    providers: [
        contentDensityObserverProviders({
            supportedContentDensity: [
                ContentDensityMode.COMPACT,
                ContentDensityMode.COZY,
                ContentDensityMode.CONDENSED
            ],
            defaultContentDensity: ContentDensityMode.COMPACT
        })
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [ObjectStatusComponent, AsyncPipe]
})
export class ContentDensityUserComponent {
    constructor(readonly _contentDensityObserver: ContentDensityObserver) {
        _contentDensityObserver.subscribe();
    }
}
