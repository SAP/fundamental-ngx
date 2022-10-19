import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-select[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedSelectCompactDirective)
        }
    ]
})
export class DeprecatedSelectCompactDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fd-select');
    }
}
