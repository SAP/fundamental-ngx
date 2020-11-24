import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdListContent], [fd-list-content]'
})
export class ListContentDirective {
    /** @hidden */
    @HostBinding('class.fd-list__content')
    fdListContentClass = true;

    /** Whether or not this is a 2-column content. */
    @Input()
    @HostBinding('fd-list__content--2-col')
    twoCol = false;
}
