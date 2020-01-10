import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-radio-form-group-example',
    templateUrl: './radio-form-group-example.component.html',
    styleUrls: ['radio-form-group-example.component.scss']
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
