import { Directive } from '@angular/core';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'input[fd-form-control]',
    providers: [
        contentDensityObserverProviders({
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
    /** @hidden */
    constructor(private _contentDensityObserver: ContentDensityObserver) {
        _contentDensityObserver.subscribe();
    }
}
