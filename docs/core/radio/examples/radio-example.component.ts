import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    FieldsetComponent,
    FormGroupComponent,
    FormHeaderComponent,
    FormItemComponent,
    FormLegendDirective
} from '@fundamental-ngx/core/form';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';

@Component({
    selector: 'fd-radio-example',
    templateUrl: './radio-example.component.html',
    standalone: true,
    imports: [
        FormHeaderComponent,
        FieldsetComponent,
        FormLegendDirective,
        FormGroupComponent,
        FormItemComponent,
        RadioButtonComponent,
        FormsModule
    ]
})
export class RadioExampleComponent {
    optionVariable = 'val1';
    optionTwoVariable = 'val2';
    optionThreeVariable = 'val1';
    optionFourVariable = 'val1';
    optionFiveVariable = 'val1';
    optionSixVariable = 'val1';
    optionSevenVariable = 'val1';
}
