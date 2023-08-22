import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormInputMessageGroupModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

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
    standalone: true,
    imports: [
        FormItemModule,
        FormLabelModule,
        FormInputMessageGroupModule,
        FormControlModule,
        FormMessageModule,
        InputGroupModule,
        MultiInputModule,
        FormsModule
    ]
})
export class FormMessageExampleComponent {
    open = false;

    openCustom = false;

    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selected: string[] = ['Apple', 'Banana'];
}
