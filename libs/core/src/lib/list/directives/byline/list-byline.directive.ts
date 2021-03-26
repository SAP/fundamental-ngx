import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fdListByline], [fd-list-byline]',
    host: {
        class: 'fd-list__byline',
        '[class.fd-list__byline--2-col]': 'twoCol',
        '[class.fd-list__byline--wrap]': 'wrap',
    }
})
export class ListBylineDirective {
    /** Whether or not this is a 2-column byline. */
    @Input()
    twoCol = false;

    /** Whether or not this should be wrapped, when too much text. */
    @Input()
    wrap = false;
}
