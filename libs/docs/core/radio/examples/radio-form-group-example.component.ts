import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetComponent, FormItemComponent } from '@fundamental-ngx/core/form';
import { RadioModule } from '@fundamental-ngx/core/radio';

@Component({
    selector: 'fd-radio-form-group-example',
    templateUrl: './radio-form-group-example.component.html',
    styleUrls: ['radio-form-group-example.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, FieldsetComponent, FormItemComponent, RadioModule]
})
export class RadioFormGroupExampleComponent {
    radioInput = {
        name: 'radio-input-form-1',
        formControlName: 'radioInput',
        values: [1, 2, 3]
    };

    disabledRadio = {
        name: 'radio-input-form-2',
        formControlName: 'disabledRadio',
        values: ['1', '2', '3']
    };

    customForm = new FormGroup({
        radioInput: new FormControl(1),
        disabledRadio: new FormControl({ value: '1', disabled: true })
    });
}
