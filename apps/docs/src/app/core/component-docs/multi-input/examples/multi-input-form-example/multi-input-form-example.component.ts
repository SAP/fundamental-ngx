import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-multi-input-form-example',
    templateUrl: './multi-input-form-example.component.html'
})
export class MultiInputFormExampleComponent {
    customForm = new FormGroup({
        selectedValues: new FormControl({ value: ['Apple', 'Banana'], disabled: false }),
        disabledSelectedValues: new FormControl({ value: ['Pineapple', 'Tomato'], disabled: true })
    });

    isValid(): boolean {
        return this.customForm.get('selectedValues').value && this.customForm.get('selectedValues').value.length > 0;
    }
}
