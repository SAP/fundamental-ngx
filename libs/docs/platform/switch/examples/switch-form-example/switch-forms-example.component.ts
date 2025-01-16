import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-switch-forms-example',
    templateUrl: './switch-forms-example.component.html',
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformSwitchModule,
        ContentDensityDirective,
        JsonPipe
    ]
})
export class SwitchFormsExampleComponent {
    customForm = new FormGroup({
        switch1: new FormControl(false),
        switch2: new FormControl(true),
        switch3: new FormControl(false)
    });
    validators = [Validators.requiredTrue];
}
