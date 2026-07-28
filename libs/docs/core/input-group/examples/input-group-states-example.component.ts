import { Component } from '@angular/core';
import {
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-states-example',
    templateUrl: './input-group-states-example.component.html',
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        InputGroupModule,
        FormMessageComponent
    ]
})
export class InputGroupStatesExampleComponent {}
