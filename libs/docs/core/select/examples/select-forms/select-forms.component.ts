import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-forms',
    templateUrl: './select-forms.component.html',
    styleUrls: ['select-forms.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, SelectModule, NgFor]
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
