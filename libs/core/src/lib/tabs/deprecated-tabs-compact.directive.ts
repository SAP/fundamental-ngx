import { DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-tab-nav][compact], fd-tab-list[compact]'
})
export class DeprecatedTabsCompactDirective extends DeprecatedCompactDirective {
    constructor() {
        super('[fd-tab-nav][compact], fd-tab-list');
    }
}
