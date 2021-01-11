import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-quick-view-group-item-content',
    templateUrl: './quick-view-group-item-content.component.html',
    host: {
        '[class.fd-input]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewGroupItemContentComponent {}
