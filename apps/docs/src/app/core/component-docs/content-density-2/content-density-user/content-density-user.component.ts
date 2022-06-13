import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import {
    ContentDensityConsumer,
    contentDensityConsumer,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fundamental-ngx-content-density-user',
    template: '<ng-content></ng-content> - {{ _contentDensityConsumer | async }}',
    styleUrls: ['./content-density-user.component.scss'],
    host: {
        class: 'example-component'
    },
    providers: [
        DestroyedService,
        contentDensityConsumer({
            modifiers: {
                [ContentDensityMode.COMPACT]: 'example-component--compact',
                [ContentDensityMode.CONDENSED]: 'example-component--condensed'
            },
            defaultContentDensity: ContentDensityMode.COMPACT,
            enforceMode: true
        })
    ],
    encapsulation: ViewEncapsulation.None
})
export class ContentDensityUserComponent {
    constructor(@Inject(ContentDensityConsumer) readonly _contentDensityConsumer: ContentDensityConsumer) {}
}
