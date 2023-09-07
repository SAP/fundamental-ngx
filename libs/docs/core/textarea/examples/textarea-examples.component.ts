import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    FormControlModule,
    FormHeaderComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-example',
    templateUrl: './textarea-example.component.html',
    standalone: true,
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlModule, ContentDensityDirective]
})
export class TextareaExampleComponent {}

@Component({
    selector: 'fd-textarea-inline-help-example',
    templateUrl: './textarea-inline-help-example.component.html',
    standalone: true,
    imports: [FormItemComponent, FormLabelComponent, FormControlModule]
})
export class TextareaInlineHelpExampleComponent {}

@Component({
    selector: 'fd-textarea-state-example',
    templateUrl: './textarea-state-example.component.html',
    standalone: true,
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        FormControlModule,
        FormMessageComponent
    ]
})
export class TextareaStateExampleComponent {}
