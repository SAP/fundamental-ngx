import { Directive } from '@angular/core';
import {
    ContentDensityConsumer,
    contentDensityConsumerProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'input[fd-form-control]',
    providers: [
        contentDensityConsumerProviders({
            modifiers: {
                [ContentDensityMode.COMPACT]: 'fd-input--compact'
            }
        })
    ],
    host: {
        class: 'fd-input'
    }
})
export class InputFormControlDirective {
    constructor(readonly _contentDensityConsumer: ContentDensityConsumer) {}
}
