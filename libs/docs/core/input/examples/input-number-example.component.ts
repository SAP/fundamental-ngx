import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-number-example',
    templateUrl: './input-number-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, FormControlComponent, FormsModule]
})
export class InputNumberExampleComponent {
    // Example values for demonstration
    value1 = 50;
    value2 = 50;
    value3 = 3;
    value3b = 3;
    value4 = 0;
    value4b = 0;
    value5 = 1;
    value5b = 3;
    value6 = 5;
    value7 = 3.14;
    value8 = 0;
    value9 = 1234.56;
    value9b = 1234.56;
    value9c = 1234.56;
    value10 = 1000000;
    value11 = 1234.56;
}
