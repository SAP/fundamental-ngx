import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdListBylineLeft], [fd-list-byline-left]'
})
export class ListBylineLeftDirective {
    /** @hidden */
    @HostBinding('class.fd-list__byline-left')
    fdListBylineLeftClass = true;

    /** Whether or not this should be wrapped, when too much text. */
    @Input()
    @HostBinding('class.fd-list__byline-left--wrap')
    wrap = false;
}
