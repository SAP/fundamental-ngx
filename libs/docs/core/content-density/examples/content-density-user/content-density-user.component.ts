import { Component, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { AsyncPipe } from '@angular/common';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

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
            supportedContentDensity: [
                ContentDensityMode.COMPACT,
                ContentDensityMode.COZY,
                ContentDensityMode.CONDENSED
            ],
            defaultContentDensity: ContentDensityMode.COMPACT
        })
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ObjectStatusModule, AsyncPipe]
})
export class ContentDensityUserComponent {
    constructor(readonly _contentDensityObserver: ContentDensityObserver) {
        _contentDensityObserver.subscribe();
    }
}
