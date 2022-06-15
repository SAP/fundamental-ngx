import { Directive } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import {
    ContentDensityConsumer,
    contentDensityConsumer,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'textarea[fd-form-control]',
    providers: [
        DestroyedService,
        contentDensityConsumer({
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
            modifiers: {
                [ContentDensityMode.COMPACT]: 'fd-textarea--compact'
            }
        })
    ],
    host: {
        class: 'fd-textarea'
    }
})
export class TextareaFormControlDirective {
    constructor(readonly _contentDensityConsumer: ContentDensityConsumer) {}
}
