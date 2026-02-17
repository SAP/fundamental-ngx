import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-radio-button-reactive-forms-sample',
    templateUrl: './reactive-forms-sample.html',
    standalone: true,
    imports: [RadioButton, ReactiveFormsModule]
})
export class ReactiveFormsSample {
    radioInput = {
        name: 'radio-input-form-1',
        formControlName: 'radioInput',
        values: ['option1', 'option2', 'option3']
    };

    disabledRadio = {
        name: 'radio-input-form-2',
        formControlName: 'disabledRadio',
        values: ['option-a', 'option-b', 'option-c']
    };

    customForm = new FormGroup({
        radioInput: new FormControl('option1'),
        disabledRadio: new FormControl({ value: 'option-a', disabled: true })
    });
}
