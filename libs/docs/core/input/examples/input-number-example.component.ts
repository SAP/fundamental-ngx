import { Component } from '@angular/core';
import {
    FormControlComponent,
    FormHeaderComponent,
    FormItemComponent,
    FormLabelComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-number-example',
    templateUrl: './input-number-example.component.html',
    styleUrls: ['./input-number-example.component.scss'],
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlComponent]
})
export class InputNumberExampleComponent {}
