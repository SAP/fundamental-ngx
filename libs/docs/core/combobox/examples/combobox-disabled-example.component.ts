import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { FieldSetModule, FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-disabled-example',
    templateUrl: './combobox-disabled-example.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FieldSetModule, FormItemModule, FormLabelModule, ComboboxModule]
})
export class ComboboxDisabledExampleComponent {
    dropdownValues = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];

    customForm = new FormGroup({
        disabledComboControl: new FormControl({ value: 'Kiwi', disabled: true }, Validators.required)
    });
}
