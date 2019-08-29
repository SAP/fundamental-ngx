import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-input-disabled-form',
    templateUrl: './input-disabled-form-example.component.html',
    styles: [`
        input {
            margin-bottom: 10px;
        }
    `]
})
export class InputDisabledFormExampleComponent {
    disabledCustomForm = new FormGroup({
        inputControl: new FormControl({value: '', disabled: true}, Validators.required)
    });
}
