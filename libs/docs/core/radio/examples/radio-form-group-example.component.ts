import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { NgFor } from '@angular/common';
import { FieldSetModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-radio-form-group-example',
    templateUrl: './radio-form-group-example.component.html',
    styleUrls: ['radio-form-group-example.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FieldSetModule, NgFor, FormItemModule, RadioModule]
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
