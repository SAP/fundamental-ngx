import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
    ContentDensityConsumer,
    contentDensityConsumerProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-docs-content-density-user',
    template: `
        <ng-content></ng-content>
        <span fd-object-status class="example-component__object-status" [inverted]="true">
            {{ _contentDensityConsumer | async }}
        </span>
    `,
    styleUrls: ['./content-density-user.component.scss'],
    host: {
        class: 'example-component'
    },
    providers: [
        contentDensityConsumerProviders({
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
    constructor(@Inject(ContentDensityConsumer) readonly _contentDensityConsumer: ContentDensityConsumer) {}
}
