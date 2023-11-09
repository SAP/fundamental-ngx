import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-feed-list-avatar',
    host: { class: 'fd-feed-list__thumb' },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FeedListAvatarComponent {}
