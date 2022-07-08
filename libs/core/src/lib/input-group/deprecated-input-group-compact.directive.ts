import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-input-group[compact], [fd-input-group-addon][compact], [fd-input-group-input][compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedInputGroupCompactDirective)
        }
    ]
})
export class DeprecatedInputGroupCompactDirective extends DeprecatedCompactDirective {
    constructor() {
        super('fd-input-group[compact], [fd-input-group-addon][compact], [fd-input-group-input]');
    }
}
