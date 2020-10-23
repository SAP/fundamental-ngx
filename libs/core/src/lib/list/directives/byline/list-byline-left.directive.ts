import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdListBylineLeft], [fd-list-byline-left]'
})
export class ListBylineLeftDirective {
    /** @hidden */
    @HostBinding('class.fd-list__byline-left')
    fdListBylineLeftClass = true;
}
