import { Component } from '@angular/core';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { FormInputMessageGroupModule } from '@fundamental-ngx/core/form';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { FormHeaderModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-example',
    templateUrl: './input-example.component.html',
    standalone: true,
    imports: [FormHeaderModule, FormItemModule, FormLabelModule, FormControlModule, ContentDensityDirective]
})
export class InputExampleComponent {}

@Component({
    selector: 'fd-input-inline-help-example',
    templateUrl: './input-inline-help-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, FormControlModule]
})
export class InputInlineHelpExampleComponent {}

@Component({
    selector: 'fd-input-state-example',
    templateUrl: './input-state-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, FormInputMessageGroupModule, FormControlModule, FormMessageModule]
})
export class InputStateExampleComponent {}
