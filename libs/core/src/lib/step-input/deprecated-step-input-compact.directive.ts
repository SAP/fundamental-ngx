import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-step-input[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedStepInputCompactDirective)
        }
    ]
})
export class DeprecatedStepInputCompactDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fd-step-input');
    }
}
