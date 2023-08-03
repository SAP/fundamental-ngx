import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-shellbar-user-menu[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedShellbarCompactDirective)
        }
    ],
    standalone: true
})
export class DeprecatedShellbarCompactDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fd-shellbar-user-menu');
    }
}
