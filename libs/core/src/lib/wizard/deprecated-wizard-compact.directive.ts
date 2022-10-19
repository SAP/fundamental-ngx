import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-wizard-step-indicator[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedWizardCompactDirective)
        }
    ]
})
export class DeprecatedWizardCompactDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fd-wizard-step-indicator');
    }
}
