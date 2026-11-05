import { Component } from '@angular/core';
import {
    FormControlComponent,
    FormHeaderComponent,
    FormItemComponent,
    FormLabelComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-example',
    templateUrl: './input-example.component.html',
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlComponent]
})
export class InputExampleComponent {}
