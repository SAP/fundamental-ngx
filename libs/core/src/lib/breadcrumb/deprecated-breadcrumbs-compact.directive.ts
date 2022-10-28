import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-breadcrumb[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedBreadcrumbsCompactDirective)
        }
    ]
})
export class DeprecatedBreadcrumbsCompactDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fd-breadcrumb');
    }
}
