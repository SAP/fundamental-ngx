import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-text-compact-example',
    templateUrl: './input-group-text-compact-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, InputGroupModule, ContentDensityDirective]
})
export class InputGroupTextCompactExampleComponent {}
