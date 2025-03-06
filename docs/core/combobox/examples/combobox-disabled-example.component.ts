import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FieldsetComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-disabled-example',
    templateUrl: './combobox-disabled-example.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FieldsetComponent,
        FormItemComponent,
        FormLabelComponent,
        ComboboxComponent
    ]
})
export class ComboboxDisabledExampleComponent {
    dropdownValues = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];

    customForm = new FormGroup({
        disabledComboControl: new FormControl({ value: 'Kiwi', disabled: true }, Validators.required)
    });
}
