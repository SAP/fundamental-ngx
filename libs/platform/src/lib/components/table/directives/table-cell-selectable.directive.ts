import { AfterContentChecked, AfterViewChecked, Directive, HostListener } from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/core';
import { SPACE } from '@angular/cdk/keycodes';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fdTableCellSelectable], [fd-table-cell-selectable]'
})
export class FdpCellSelectableDirective {
    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, SPACE)) {
            // prevent page scrolling on Space keydown at checkbox/radio
            event.preventDefault();
        }
    }
}
