import { Directive } from '@angular/core';
import {
    ContentDensityConsumer,
    contentDensityConsumerProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'textarea[fd-form-control]',
    providers: [
        contentDensityConsumerProviders({
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
