import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-feed-list-footer',
    template: '<ng-content></ng-content>',
    host: { class: 'fd-feed-list__footer' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListFooterComponent {}
