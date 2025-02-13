import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    FormControlComponent,
    FormHeaderComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-example',
    templateUrl: './textarea-example.component.html',
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlComponent, ContentDensityDirective]
})
export class TextareaExampleComponent {}

@Component({
    selector: 'fd-textarea-inline-help-example',
    templateUrl: './textarea-inline-help-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, FormControlComponent]
})
export class TextareaInlineHelpExampleComponent {}

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
