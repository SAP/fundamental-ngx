import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-split-button[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedSplitButtonCompactDirective)
        }
    ]
})
export class DeprecatedSplitButtonCompactDirective extends DeprecatedCompactDirective {
    constructor() {
        super('fd-split-button');
    }
}
