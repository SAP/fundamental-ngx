import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-switch-readonly-example',
    templateUrl: './switch-readonly-example.component.html',
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformSwitchModule,
        ContentDensityDirective,
        JsonPipe
    ]
})
export class SwitchReadonlyExampleComponent {
    ngModelChecked = true;

    customForm = new FormGroup({
        switch: new FormControl(true)
    });
}
