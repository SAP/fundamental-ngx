import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fd-item-footer-byline]'
})
export class FeedListFooterBylineDirective {
  @HostBinding('class.fd-feed-list__footer--byline')
  fdBylineClass = true;
}
