import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: `fd-action-sheet[compact], fd-action-sheet-body[compact], [fd-action-sheet-item][compact]`,
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedActionSheetCompactDirective)
        }
    ]
})
export class DeprecatedActionSheetCompactDirective extends DeprecatedCompactDirective {
    constructor() {
        super(`[fd-action-sheet-item][compact], fd-action-sheet-body[compact] and fd-action-sheet`);
    }
}
