import { Directive, HostListener, Input } from '@angular/core';
import { SPACE } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdTableCellSelectable], [fd-table-cell-selectable]',
    standalone: true
})
export class FdpCellSelectableDirective {
    /** Whether the selection is enabled. */
    @Input()
    enabled = true;
    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (!this.enabled) {
            return;
        }
        if (KeyUtil.isKeyCode(event, SPACE)) {
            // prevent page scrolling on Space keydown at checkbox/radio
            event.preventDefault();
        }
    }
}
