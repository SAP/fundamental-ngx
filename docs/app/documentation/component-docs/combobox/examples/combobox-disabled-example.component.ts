import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-combobox-disabled-example',
    styles: [`
        .flex-form{
            display:flex;
            justify-content: space-between
        }
    `],
    templateUrl: './combobox-disabled-example.component.html'
})
export class ComboboxDisabledExampleComponent {

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry'
    ];

    customForm = new FormGroup({
        comboControl: new FormControl('Banana', Validators.required),
        disabledComboControl: new FormControl({ value: 'Kiwi', disabled: true }, Validators.required)
    });

}
