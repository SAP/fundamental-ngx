import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchModule } from '@fundamental-ngx/core/switch';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-disabled-switch-example',
    templateUrl: './disabled-switch-example.component.html',
    styleUrls: ['./disabled-switch-example.component.scss'],
    standalone: true,
    imports: [FormLabelModule, SwitchModule, FormsModule]
})
export class DisabledSwitchExampleComponent {
    checked = false;
}
