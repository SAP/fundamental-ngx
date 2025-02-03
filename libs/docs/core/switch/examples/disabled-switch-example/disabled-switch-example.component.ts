import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'fd-disabled-switch-example',
    templateUrl: './disabled-switch-example.component.html',
    styleUrls: ['./disabled-switch-example.component.scss'],
    imports: [FormLabelComponent, SwitchComponent, FormsModule]
})
export class DisabledSwitchExampleComponent {
    checked = false;
}
