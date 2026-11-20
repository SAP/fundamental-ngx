import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-readonly-example',
    templateUrl: 'combobox-readonly-example.component.html',
    styleUrls: ['combobox-readonly-example.component.scss'],
    imports: [ReactiveFormsModule, FormItemComponent, FormLabelComponent, ComboboxComponent, JsonPipe]
})
export class ComboboxReadonlyExampleComponent {
    dropdownValues: string[] = ['Apple', 'Banana', 'Kiwi', 'Strawberry', 'Tomato'];

    customForm = new FormGroup({
        withClearButton: new FormControl('Apple'),
        default: new FormControl('Apple')
    });
}
