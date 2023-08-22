import { Component } from '@angular/core';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormInputMessageGroupModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

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
    imports: [FormItemModule, FormLabelModule, FormInputMessageGroupModule, FormControlModule, FormMessageModule]
})
export class FormMessagingStateExampleComponent {}
