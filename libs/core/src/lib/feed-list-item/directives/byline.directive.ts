import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fdItemFooterByline]'
})
export class FeedListFooterBylineDirective {
  @HostBinding('class.fd-feed-list__footer--byline')
  fdBylineClass = true;
}
