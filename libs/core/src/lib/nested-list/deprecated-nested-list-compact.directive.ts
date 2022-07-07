import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    selector: '[fdNestedList][compact], [fd-nested-list][compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedNestedListCompactDirective)
        }
    ]
})
export class DeprecatedNestedListCompactDirective extends DeprecatedCompactDirective {
    constructor() {
        super('[fdNestedList][compact], [fd-nested-list]');
    }
}
