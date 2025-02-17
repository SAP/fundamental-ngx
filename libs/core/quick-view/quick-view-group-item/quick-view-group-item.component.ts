import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormItemComponent } from '@fundamental-ngx/core/form';

let quickViewGroupItemUniqueId = 0;

@Component({
    selector: 'fd-quick-view-group-item',
    templateUrl: './quick-view-group-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormItemComponent]
})
export class QuickViewGroupItemComponent {
    /** Id of the quick view element. */
    @Input()
    id: string = 'fd-quick-view-group-item-' + quickViewGroupItemUniqueId++;
}
