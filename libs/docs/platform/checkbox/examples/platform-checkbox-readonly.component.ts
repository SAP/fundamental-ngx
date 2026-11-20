import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent, FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-checkbox-readonly',
    templateUrl: 'platform-checkbox-readonly.component.html',
    imports: [FdpFormGroupModule, CheckboxComponent, FormsModule, ReactiveFormsModule]
})
export class PlatformChekboxReadonlyComponent {
    ngModelChecked = true;

    readonlyForm = new FormGroup({
        checkbox: new FormControl(true)
    });
}
