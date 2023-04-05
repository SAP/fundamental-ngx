import { Directive } from '@angular/core';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'textarea[fd-form-control]',
    providers: [contentDensityObserverProviders()],
    host: {
        class: 'fd-textarea'
    }
})
export class TextareaFormControlDirective {
    /** @hidden */
    constructor(private _contentDensityObserver: ContentDensityObserver) {
        _contentDensityObserver.subscribe();
    }
}
