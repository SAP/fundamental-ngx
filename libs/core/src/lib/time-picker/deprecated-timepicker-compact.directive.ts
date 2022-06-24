import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-time-picker[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedTimepickerCompactDirective)
        }
    ]
})
export class DeprecatedTimepickerCompactDirective extends DeprecatedCompactDirective {
    constructor() {
        super('fd-time-picker');
    }
}
