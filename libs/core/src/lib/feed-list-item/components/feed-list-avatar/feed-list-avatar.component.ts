import { Component } from '@angular/core';

@Component({
    selector: 'fd-feed-list-avatar',
    template: '<ng-content></ng-content>',
    host: { class: 'fd-feed-list__thumb' },
    standalone: true
})
export class FeedListAvatarComponent {}
