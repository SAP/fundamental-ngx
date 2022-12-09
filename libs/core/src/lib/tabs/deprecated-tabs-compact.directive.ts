import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    selector: '[fd-tab-nav][compact], fd-tab-list[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedTabsCompactDirective)
        }
    ]
})
export class DeprecatedTabsCompactDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('[fd-tab-nav][compact], fd-tab-list');
    }
}
