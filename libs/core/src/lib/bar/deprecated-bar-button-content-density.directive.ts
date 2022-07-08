import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-button-bar[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedBarButtonContentDensityDirective)
        }
    ]
})
export class DeprecatedBarButtonContentDensityDirective extends DeprecatedCompactDirective {
    constructor() {
        super('fd-button-bar');
    }
}
