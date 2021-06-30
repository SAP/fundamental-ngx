import { Component } from '@angular/core';

@Component({
  selector: 'fd-feed-list-footer',
  styleUrls: ['./feed-list-footer.component.scss'],
  template: '<ng-content></ng-content>',
  host: { class: 'fd-feed-list__footer'}
})
export class FeedListFooterComponent {
}
