import { Directive } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    selector: '[fd-form-control][compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: DeprecatedFormControlContentDensityDirective
        }
    ]
})
export class DeprecatedFormControlContentDensityDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('input[fd-form-control][compact], textarea[fd-form-control]');
    }
}
