import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchModule } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'fd-disabled-switch-example',
    templateUrl: './disabled-switch-example.component.html',
    styleUrls: ['./disabled-switch-example.component.scss'],
    standalone: true,
    imports: [FormLabelComponent, SwitchModule, FormsModule]
})
export class DisabledSwitchExampleComponent {
    checked = false;
}
