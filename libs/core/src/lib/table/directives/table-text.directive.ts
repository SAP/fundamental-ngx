import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableText], [fd-table-text]'
})
export class TableTextDirective {
    /** Whether the text should have shadow (halo) & overflow should be hidden. */
    @HostBinding('class.fd-table__text')
    @Input()
    fdTableTextClass = true;

    /** Whether the text should wrap when the text is too long for 1 line */
    @HostBinding('class.fd-table__text--no-wrap')
    @Input()
    noWrap = false;

    /** Whether the text should be bolded and marked as a title */
    @HostBinding('class.fd-table__text--title')
    @Input()
    title = false;

    /** Maximum width of a text element */
    @HostBinding('style.max-width')
    @Input()
    maxWidth: string;
}
