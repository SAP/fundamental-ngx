import { Component } from '@angular/core';
import {
    FormControlComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-state-example',
    templateUrl: './textarea-state-example.component.html',
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        FormControlComponent,
        FormMessageComponent
    ]
})
export class TextareaStateExampleComponent {}
