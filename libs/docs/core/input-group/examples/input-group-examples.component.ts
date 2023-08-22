import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { FormInputMessageGroupModule } from '@fundamental-ngx/core/form';
import { FormHeaderModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-group-button-example',
    templateUrl: './input-group-button-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, InputGroupModule]
})
export class InputGroupButtonExampleComponent {}

@Component({
    selector: 'fd-input-group-icon-example',
    templateUrl: './input-group-icon-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, InputGroupModule]
})
export class InputGroupIconExampleComponent {}

@Component({
    selector: 'fd-input-group-text-example',
    templateUrl: './input-group-text-example.component.html',
    standalone: true,
    imports: [FormHeaderModule, FormItemModule, FormLabelModule, InputGroupModule]
})
export class InputGroupTextExampleComponent {}

@Component({
    selector: 'fd-input-group-text-compact-example',
    templateUrl: './input-group-text-compact-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, InputGroupModule, ContentDensityDirective]
})
export class InputGroupTextCompactExampleComponent {}

@Component({
    selector: 'fd-input-group-complex-example',
    templateUrl: './input-group-complex-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, InputGroupModule, FormControlModule, ButtonModule]
})
export class InputGroupComplexExampleComponent {}

@Component({
    selector: 'fd-input-group-states-example',
    templateUrl: './input-group-states-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, FormInputMessageGroupModule, InputGroupModule, FormMessageModule]
})
export class InputGroupStatesExampleComponent {}
