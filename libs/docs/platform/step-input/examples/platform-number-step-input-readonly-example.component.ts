import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { PlatformStepInputModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-number-step-input-readonly-example',
    templateUrl: './platform-number-step-input-readonly-example.component.html',
    styleUrls: ['./platform-number-step-input-readonly-example.component.scss'],
    imports: [PlatformStepInputModule, FormLabelComponent, FormsModule, ReactiveFormsModule, JsonPipe]
})
export class PlatformNumberStepInputReadonlyExampleComponent {
    qty = 12;

    readonlyForm = new FormGroup({
        qty: new FormControl(12)
    });
}
