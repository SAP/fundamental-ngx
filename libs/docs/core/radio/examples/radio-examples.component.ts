import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { FormGroupModule } from '@fundamental-ngx/core/form';
import { FormLegendModule } from '@fundamental-ngx/core/form';
import { FieldSetModule } from '@fundamental-ngx/core/form';
import { FormHeaderModule } from '@fundamental-ngx/core/form';

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
