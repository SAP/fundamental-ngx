import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    FieldsetComponent,
    FormGroupComponent,
    FormItemComponent,
    FormLegendDirective
} from '@fundamental-ngx/core/form';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';

@Component({
    selector: 'fd-radio-truncation-example',
    templateUrl: './radio-truncation-example.component.html',
    standalone: true,
    imports: [
        FieldsetComponent,
        FormLegendDirective,
        FormGroupComponent,
        FormItemComponent,
        RadioButtonComponent,
        FormsModule
    ]
})
export class RadioTruncationExampleComponent {
    optionVariable = 'valt1';
}
