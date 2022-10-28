import { Directive, ElementRef, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-combobox[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedComboboxContentDensityDirective)
        }
    ]
})
export class DeprecatedComboboxContentDensityDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor(private elRef: ElementRef) {
        super('fd-combobox');
    }
}
