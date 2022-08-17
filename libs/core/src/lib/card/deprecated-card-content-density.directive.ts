import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-card[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedCardContentDensityDirective)
        }
    ]
})
export class DeprecatedCardContentDensityDirective extends DeprecatedCompactDirective {
    constructor() {
        super('fd-card');
    }
}
