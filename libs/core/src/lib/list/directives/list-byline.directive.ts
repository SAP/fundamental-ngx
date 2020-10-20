import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdListByline], [fd-list-byline]'
})
export class ListBylineDirective {
    /** @hidden */
    @HostBinding('class.fd-list__byline')
    fdListBylineClass = true;

    /** Whether or not this is a 2-column byline. */
    @Input()
    @HostBinding('fd-list__byline--2-col')
    twoCol = false;
}
