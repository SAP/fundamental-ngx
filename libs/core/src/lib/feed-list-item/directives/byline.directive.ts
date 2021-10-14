import { Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-item-footer-byline]'
})
export class FeedListFooterBylineDirective {
    @HostBinding('class.fd-feed-list__footer--byline')
    fdBylineClass = true;
}
