import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
    selector: '[fdListBylineLeft], [fd-list-byline-left]',
    host: {
        class: 'fd-list__byline-left',
        '[class.fd-list__byline-left--wrap]': 'wrap()'
    }
})
export class ListBylineLeftDirective {
    /** Whether or not this should be wrapped, when too much text. */
    readonly wrap = input(false, { transform: booleanAttribute });
}
