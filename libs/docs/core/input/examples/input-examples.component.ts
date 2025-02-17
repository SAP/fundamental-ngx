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
    selector: 'fd-input-example',
    templateUrl: './input-example.component.html',
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlComponent, ContentDensityDirective]
})
export class InputExampleComponent {}

@Component({
    selector: 'fd-input-inline-help-example',
    templateUrl: './input-inline-help-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, FormControlComponent]
})
export class InputInlineHelpExampleComponent {}

@Component({
    selector: 'fd-input-state-example',
    templateUrl: './input-state-example.component.html',
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        FormControlComponent,
        FormMessageComponent
    ]
})
export class InputStateExampleComponent {}
