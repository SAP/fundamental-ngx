import { Component } from '@angular/core';

@Component({
    selector: 'fd-feed-list-avatar',
    template: '<ng-content></ng-content>',
    host: { class: 'fd-feed-list__thumb' }
})
export class FeedListAvatarComponent {}
