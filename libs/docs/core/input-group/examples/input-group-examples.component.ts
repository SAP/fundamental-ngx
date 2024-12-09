import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    FormControlComponent,
    FormHeaderComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-button-example',
    templateUrl: './input-group-button-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule]
})
export class InputGroupButtonExampleComponent {}

@Component({
    selector: 'fd-input-group-icon-example',
    templateUrl: './input-group-icon-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule]
})
export class InputGroupIconExampleComponent {}

@Component({
    selector: 'fd-input-group-text-example',
    templateUrl: './input-group-text-example.component.html',
    imports: [FormHeaderComponent, FormItemComponent, FormLabelComponent, InputGroupModule]
})
export class InputGroupTextExampleComponent {}

@Component({
    selector: 'fd-input-group-text-compact-example',
    templateUrl: './input-group-text-compact-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule, ContentDensityDirective]
})
export class InputGroupTextCompactExampleComponent {}

@Component({
    selector: 'fd-input-group-complex-example',
    templateUrl: './input-group-complex-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule, FormControlComponent, ButtonComponent]
})
export class InputGroupComplexExampleComponent {}

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
