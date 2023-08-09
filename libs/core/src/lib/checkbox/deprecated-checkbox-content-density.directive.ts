import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-checkbox[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedCheckboxContentDensityDirective)
        }
    ],
    standalone: true
})
export class DeprecatedCheckboxContentDensityDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fd-checkbox');
    }
}
