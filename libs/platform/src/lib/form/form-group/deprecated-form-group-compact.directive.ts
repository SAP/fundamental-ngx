import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-form-group[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedFormGroupCompactDirective)
        }
    ]
})
export class DeprecatedFormGroupCompactDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fdp-form-group');
    }
}
