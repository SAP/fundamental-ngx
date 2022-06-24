import { Directive } from '@angular/core';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'textarea[fd-form-control]',
    providers: [
        contentDensityObserverProviders({
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
    constructor(readonly _contentDensityObserver: ContentDensityObserver) {}
}
