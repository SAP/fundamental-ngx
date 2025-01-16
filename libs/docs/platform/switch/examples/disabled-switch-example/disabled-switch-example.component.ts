import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-disabled-switch-example',
    templateUrl: './disabled-switch-example.component.html',
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformSwitchModule, ContentDensityDirective]
})
export class DisabledSwitchExampleComponent {
    customForm = new FormGroup({
        fieldDisable: new FormControl({ value: true, disabled: true })
    });
}
