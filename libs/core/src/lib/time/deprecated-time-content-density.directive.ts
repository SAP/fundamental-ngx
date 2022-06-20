import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-time-column[compact], fd-time[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedTimeContentDensityDirective)
        }
    ]
})
export class DeprecatedTimeContentDensityDirective extends DeprecatedCompactDirective {
    constructor() {
        super('fd-time-column[compact], fd-time');
    }
}
