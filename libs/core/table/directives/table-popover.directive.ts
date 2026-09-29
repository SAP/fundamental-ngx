import { Directive } from '@angular/core';

@Directive({
    selector: '[fdTablePopover], [fd-table-popover]',
    host: {
        class: 'fd-table__popover fd-table__popover--custom'
    }
})
export class TablePopoverDirective {}
