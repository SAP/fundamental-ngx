import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCondensedDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    selector: 'table[fd-table][condensed]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedTableCondensedDirective)
        }
    ]
})
export class DeprecatedTableCondensedDirective extends DeprecatedCondensedDirective {
    constructor() {
        super('table[fd-table]');
    }
}
