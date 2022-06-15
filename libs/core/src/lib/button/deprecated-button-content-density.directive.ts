import { DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-button][compact]'
})
export class DeprecatedButtonContentDensityDirective extends DeprecatedCompactDirective {
    constructor() {
        super('[fd-button]');
    }
}
