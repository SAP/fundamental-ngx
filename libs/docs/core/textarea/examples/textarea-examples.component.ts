import { Component } from '@angular/core';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { FormInputMessageGroupModule } from '@fundamental-ngx/core/form';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { FormHeaderModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-example',
    templateUrl: './textarea-example.component.html',
    standalone: true,
    imports: [FormHeaderModule, FormItemModule, FormLabelModule, FormControlModule, ContentDensityDirective]
})
export class TextareaExampleComponent {}

@Component({
    selector: 'fd-textarea-inline-help-example',
    templateUrl: './textarea-inline-help-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, FormControlModule]
})
export class TextareaInlineHelpExampleComponent {}

@Component({
    selector: 'fd-textarea-state-example',
    templateUrl: './textarea-state-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, FormInputMessageGroupModule, FormControlModule, FormMessageModule]
})
export class TextareaStateExampleComponent {}
