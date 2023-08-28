import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    FieldSetModule,
    FormGroupModule,
    FormHeaderModule,
    FormItemModule,
    FormLegendModule
} from '@fundamental-ngx/core/form';
import { RadioModule } from '@fundamental-ngx/core/radio';

@Component({
    selector: 'fd-radio-example',
    templateUrl: './radio-example.component.html',
    standalone: true,
    imports: [
        FormHeaderModule,
        FieldSetModule,
        FormLegendModule,
        FormGroupModule,
        FormItemModule,
        RadioModule,
        FormsModule
    ]
})
export class RadioExamplesComponent {
    optionVariable = 'val1';
    optionTwoVariable = 'val2';
    optionThreeVariable = 'val1';
    optionFourVariable = 'val1';
    optionFiveVariable = 'val1';
    optionSixVariable = 'val1';
}
