import { Component } from '@angular/core';

@Component({
    selector: 'fd-feed-list-action',
    template: '<ng-content></ng-content>',
    host: { class: 'fd-feed-list__actions' }
})
export class FeedListActionComponent {}
