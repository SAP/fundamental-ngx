import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormGroupComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-quick-view-group',
    templateUrl: './quick-view-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [FormGroupComponent]
})
export class QuickViewGroupComponent {}
