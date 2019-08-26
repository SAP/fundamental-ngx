import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-combobox-disabled-example',
    templateUrl: './combobox-disabled-example.component.html'
})
export class ComboboxDisabledExampleComponent {

    customForm = new FormGroup({
        comboControl: new FormControl({ value: 'Nancy', disabled: true }, Validators.required)
    });

}
