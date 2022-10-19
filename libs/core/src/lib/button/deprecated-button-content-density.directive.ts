import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-button][compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedButtonContentDensityDirective)
        }
    ]
})
export class DeprecatedButtonContentDensityDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('[fd-button]');
    }
}
