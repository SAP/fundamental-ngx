import { Directive, Inject } from '@angular/core';
import {
    ContentDensityConsumer,
    contentDensityConsumer,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { DestroyedService } from '@fundamental-ngx/core/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'textarea[fd-form-control]',
    providers: [
        DestroyedService,
        contentDensityConsumer({
            supportedContentDensity: [ContentDensityMode.COZY, ContentDensityMode.COMPACT],
            modifiers: { [ContentDensityMode.COMPACT]: 'fd-textarea--compact' }
        })
    ],
    host: {
        '[class.fd-textarea]': 'true'
    }
})
export class TextareaFormControlDirective {
    constructor(@Inject(ContentDensityConsumer) private _consumer: ContentDensityConsumer) {}
}
