import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-feed-list-avatar',
    template: '<ng-content></ng-content>',
    host: { class: 'fd-feed-list__thumb' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListAvatarComponent {}
