import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fd-select-forms',
    templateUrl: './select-forms.component.html',
    styleUrls: ['select-forms.component.scss']
})
export class SelectFormsComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    customForm = new FormGroup({
        selectControl: new FormControl(this.options[0], Validators.required)
    });

    disabledForm = new FormGroup({
        disabledControl: new FormControl({ value: 'Apple', disabled: true }, Validators.required)
    });
}
