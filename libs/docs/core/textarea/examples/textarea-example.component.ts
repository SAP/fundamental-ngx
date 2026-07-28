import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    FormControlComponent,
    FormHeaderComponent,
    FormItemComponent,
    FormLabelComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-example',
    templateUrl: './textarea-example.component.html',
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlComponent, ContentDensityDirective]
})
export class TextareaExampleComponent {}
