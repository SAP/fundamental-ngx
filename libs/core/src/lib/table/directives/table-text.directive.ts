import {
    Directive,
    HostBinding,
    Input
} from '@angular/core';

@Directive({
    selector: '[fdTableText], [fd-table-text]'
})
export class TableTextDirective {
    /** @hidden */
    @HostBinding('class.fd-table__text')
    fdTableTextClass = true;

    /** Whether or not  the text should be bolded and marked as a title */
    @HostBinding('class.fd-table__text--title')
    @Input()
    title = false;
}
