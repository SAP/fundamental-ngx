import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { FieldSetModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-multi-input-form-example',
    templateUrl: './multi-input-form-example.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FieldSetModule,
        FormItemModule,
        FormLabelModule,
        MultiInputModule,
        JsonPipe
    ]
})
export class MultiInputFormExampleComponent {
    customForm = new FormGroup({
        selectedValues: new FormControl({ value: ['Apple', 'Banana'], disabled: false }),
        disabledSelectedValues: new FormControl({ value: ['Pineapple', 'Tomato'], disabled: true })
    });

    isValid(): boolean {
        const value = this.customForm.get('selectedValues')?.value;
        return value != null && value.length > 0;
    }
}
