import { Component } from '@angular/core';

@Component({
    selector: 'fd-feed-list-footer',
    template: '<ng-content></ng-content>',
    host: { class: 'fd-feed-list__footer' }
})
export class FeedListFooterComponent {}
