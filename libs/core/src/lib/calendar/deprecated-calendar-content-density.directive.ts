import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-calendar[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedCalendarContentDensityDirective)
        }
    ]
})
export class DeprecatedCalendarContentDensityDirective extends DeprecatedCompactDirective {
    constructor() {
        super('fd-calendar');
    }
}
