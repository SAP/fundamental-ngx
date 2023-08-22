import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformSwitchModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-switch-forms-example',
    templateUrl: './switch-forms-example.component.html',
    standalone: true,
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformSwitchModule,
        ContentDensityDirective,
        NgIf,
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
