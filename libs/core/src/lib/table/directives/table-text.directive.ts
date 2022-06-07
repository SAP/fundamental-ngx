import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableText], [fd-table-text]'
})
export class TableTextDirective {
    /** @hidden */
    @HostBinding('class.fd-table__text')
    @Input()
    fdTableTextClass = true;

    /** Whether or not  the text should wrap, when text is too long for 1 line */
    @HostBinding('class.fd-table__text--no-wrap')
    @Input()
    noWrap = false;

    /** Whether or not  the text should be bolded and marked as a title */
    @HostBinding('class.fd-table__text--title')
    @Input()
    title = false;

    /** Maximum width of text element */
    @HostBinding('style.max-width')
    @Input()
    maxWidth: string;
}
