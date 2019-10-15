import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-input-form-group-example',
    templateUrl: './input-form-group-example.component.html',
    styleUrls: ['input-form-group-example.component.scss']
})
export class InputFormGroupExampleComponent {
    customForm = new FormGroup({
        inputControl: new FormControl('', Validators.required),
        disabledInputControl: new FormControl({ value: 'initial value', disabled: true }, Validators.required)
    });
}
