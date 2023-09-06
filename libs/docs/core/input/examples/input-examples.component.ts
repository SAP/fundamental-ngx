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
    selector: 'fd-input-example',
    templateUrl: './input-example.component.html',
    standalone: true,
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlModule, ContentDensityDirective]
})
export class InputExampleComponent {}

@Component({
    selector: 'fd-input-inline-help-example',
    templateUrl: './input-inline-help-example.component.html',
    standalone: true,
    imports: [FormItemComponent, FormLabelComponent, FormControlModule]
})
export class InputInlineHelpExampleComponent {}

@Component({
    selector: 'fd-input-state-example',
    templateUrl: './input-state-example.component.html',
    standalone: true,
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        FormControlModule,
        FormMessageComponent
    ]
})
export class InputStateExampleComponent {}
