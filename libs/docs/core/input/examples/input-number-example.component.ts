import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import {
    FormControlComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-number-example',
    templateUrl: './input-number-example.component.html',
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        FormInputMessageGroupComponent,
        FormMessageComponent,
        FormsModule
    ]
})
export class InputNumberExampleComponent {
    // Example values for demonstration
    valueValidation = 0;
    value1 = 50;
    value2 = 50;
    value3 = 3;
    value3b = 3;
    value4 = 0;
    value4b = 0;
    value5 = 1;
    value5b = 3;
    value6 = 5;
    value6State: FormStates | null = null;
    value7 = 3.14;
    value8 = 0;
    value8State: FormStates | null = null;
    value9 = 1234.56;
    value9b = 1234.56;
    value9c = 1234.56;
    value10 = 1000000;
    value11 = 1234.56;
    value11b = 1234.56;
    value11c = 1234.56;
    value11d = 1234.56;
    value12 = 10;
    value12b = 10.0;

    onValue6ValidationChange(isValid: boolean): void {
        this.value6State = isValid ? null : 'error';
    }

    onValue8ValidationChange(isValid: boolean): void {
        this.value8State = isValid ? null : 'error';
    }
}
