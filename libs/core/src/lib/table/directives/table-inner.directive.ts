import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTableInner], [fd-table-inner]',
    standalone: true
})
export class TableInnerDirective {
    /** @hidden */
    @HostBinding('class.fd-table__inner')
    fdTableInnerClass = true;
}
