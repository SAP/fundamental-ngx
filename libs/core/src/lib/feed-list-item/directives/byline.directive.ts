import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-item-footer-byline]'
})
export class FeedListFooterBylineDirective {
    /** @hidden */
    @HostBinding('class.fd-feed-list__footer--byline')
    fdBylineClass = true;
}
