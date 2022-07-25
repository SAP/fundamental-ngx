import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    selector: 'table[fd-table][compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedTableCompactDirective)
        }
    ]
})
export class DeprecatedTableCompactDirective extends DeprecatedCompactDirective {
    constructor() {
        super('table[fd-table]');
    }
}
