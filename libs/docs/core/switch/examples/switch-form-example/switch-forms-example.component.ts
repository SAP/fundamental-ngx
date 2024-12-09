import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'fd-switch-forms-example',
    templateUrl: './switch-forms-example.component.html',
    styleUrls: ['./switch-forms-example.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, FormLabelComponent, SwitchComponent]
})
export class SwitchFormsExampleComponent {
    customForm = new FormGroup({
        switch1: new FormControl({ value: false, disabled: false }),
        switch2: new FormControl({ value: true, disabled: false }),
        switch3: new FormControl({ value: false, disabled: true }),
        switch4: new FormControl({ value: true, disabled: true })
    });
}
