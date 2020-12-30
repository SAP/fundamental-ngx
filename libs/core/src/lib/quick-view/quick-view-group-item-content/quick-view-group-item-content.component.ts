import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-quick-view-group-item-content',
    templateUrl: './quick-view-group-item-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewGroupItemContentComponent {
    @HostBinding('class.fd-input')
    fdInput = true;
}
