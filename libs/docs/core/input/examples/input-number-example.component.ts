import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    FormControlComponent,
    FormHeaderComponent,
    FormItemComponent,
    FormLabelComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-number-example',
    templateUrl: './input-number-example.component.html',
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlComponent, ContentDensityDirective]
})
export class InputNumberExampleComponent {}
