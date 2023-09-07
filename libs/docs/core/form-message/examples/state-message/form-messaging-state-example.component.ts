import { Component } from '@angular/core';
import {
    FormControlModule,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-form-messaging-state-example',
    templateUrl: './form-messaging-state-example.component.html',
    styles: [
        `
            .fd-custom-form-item-message {
                margin-bottom: 40px !important;
            }
        `
    ],
    standalone: true,
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        FormControlModule,
        FormMessageComponent
    ]
})
export class FormMessagingStateExampleComponent {}
