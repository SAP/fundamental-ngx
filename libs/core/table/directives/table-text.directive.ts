import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
    selector: '[fdTableText], [fd-table-text]',
    host: {
        '[class.fd-table__text]': 'fdTableTextClass()',
        '[class.fd-table__text--no-wrap]': 'noWrap()',
        '[class.fd-table__text--title]': 'title()',
        '[style.max-width]': 'maxWidth()'
    }
})
export class TableTextDirective {
    /** Whether the text should have shadow (halo) & overflow should be hidden. */
    readonly fdTableTextClass = input(true, { transform: booleanAttribute });

    /** Whether the text should wrap when the text is too long for 1 line */
    readonly noWrap = input(false, { transform: booleanAttribute });

    /** Whether the text should be bolded and marked as a title */
    readonly title = input(false, { transform: booleanAttribute });

    /** Maximum width of a text element */
    readonly maxWidth = input('');
}
