import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-form-example',
    templateUrl: './multi-input-form-example.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FieldsetComponent,
        FormItemComponent,
        FormLabelComponent,
        MultiInputComponent,
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
