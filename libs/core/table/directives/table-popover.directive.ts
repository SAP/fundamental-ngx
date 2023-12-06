import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTablePopover], [fd-table-popover]',
    standalone: true
})
export class TablePopoverDirective {
    /** @hidden */
    @HostBinding('class')
    fdTablePopoverClass = 'fd-table__popover fd-table__popover--custom';
}
