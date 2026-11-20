import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'fd-switch-readonly-example',
    templateUrl: './switch-readonly-example.component.html',
    styleUrls: ['./switch-readonly-example.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, FormLabelComponent, SwitchComponent]
})
export class SwitchReadonlyExampleComponent {
    ngModelChecked = true;

    readonlyForm = new FormGroup({
        switch: new FormControl(true)
    });
}
