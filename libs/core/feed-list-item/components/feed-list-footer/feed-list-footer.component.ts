import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-feed-list-footer',
    host: { class: 'fd-feed-list__footer' },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FeedListFooterComponent {}
