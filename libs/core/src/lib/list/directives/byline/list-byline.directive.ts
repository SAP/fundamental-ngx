import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fdListByline], [fd-list-byline]',
    host: {
        class: 'fd-list__byline',
        '[class.fd-list__byline--2-col]': 'twoCol'
    }
})
export class ListBylineDirective {
    /** Whether or not this is a 2-column byline. */
    @Input()
    twoCol = false;
}
