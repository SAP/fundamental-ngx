import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-table-filter-rule[compact]',
    providers: [
        { provide: CONTENT_DENSITY_DIRECTIVE, useExisting: forwardRef(() => PlatformCompactDeprecationDirective) }
    ]
})
export class PlatformCompactDeprecationDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fdp-table-filter-rule');
    }
}
