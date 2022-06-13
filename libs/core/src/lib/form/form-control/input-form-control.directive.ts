import { Directive, Inject } from '@angular/core';
import {
    ContentDensityConsumer,
    contentDensityConsumer,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { DestroyedService } from '@fundamental-ngx/core/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'input[fd-form-control]',
    providers: [
        DestroyedService,
        contentDensityConsumer({
            supportedContentDensity: [ContentDensityMode.COZY, ContentDensityMode.COMPACT],
            modifiers: { [ContentDensityMode.COMPACT]: 'fd-input--compact' }
        })
    ],
    host: {
        '[class.fd-input]': 'true'
    }
})
export class InputFormControlDirective {
    constructor(@Inject(ContentDensityConsumer) private _consumer: ContentDensityConsumer) {}
}
