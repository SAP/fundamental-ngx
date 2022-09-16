import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fd-combobox-disabled-example',
    templateUrl: './combobox-disabled-example.component.html'
})
export class ComboboxDisabledExampleComponent {
    dropdownValues = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];

    customForm = new FormGroup({
        disabledComboControl: new FormControl({ value: 'Kiwi', disabled: true }, Validators.required)
    });
}
