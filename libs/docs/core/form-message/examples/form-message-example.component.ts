import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    FormControlComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-form-message-example',
    templateUrl: './form-message-example.component.html',
    styles: [
        `
            .fd-custom-form-item-message {
                margin-bottom: 40px !important;
            }
        `
    ],
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        FormControlComponent,
        FormMessageComponent,
        InputGroupModule,
        MultiInputComponent,
        FormsModule
    ]
})
export class FormMessageExampleComponent {
    open = false;

    openCustom = false;

    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selected: string[] = ['Apple', 'Banana'];
}
