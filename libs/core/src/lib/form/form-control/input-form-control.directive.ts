import { Directive } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import {
    ContentDensityConsumer,
    contentDensityConsumer,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'input[fd-form-control]',
    providers: [
        DestroyedService,
        contentDensityConsumer({
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
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
