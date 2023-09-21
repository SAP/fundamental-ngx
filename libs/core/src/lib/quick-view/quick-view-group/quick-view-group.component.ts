import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-quick-view-group',
    templateUrl: './quick-view-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormGroupComponent]
})
export class QuickViewGroupComponent {}
