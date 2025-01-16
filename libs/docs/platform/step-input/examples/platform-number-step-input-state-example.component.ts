import { Component } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { PlatformStepInputModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-number-step-input-state-example',
    templateUrl: './platform-number-step-input-state-example.component.html',
    styleUrls: ['./platform-number-step-input-state-example.component.scss'],
    imports: [ContentDensityDirective, FormLabelComponent, PlatformStepInputModule]
})
export class PlatformNumberStepInputStateExampleComponent {
    states: StateOption[] = [
        {
            name: 'default',
            message: 'Default state message'
        },
        {
            name: 'success',
            message: 'Success state message'
        },
        {
            name: 'error',
            message: 'Error state message'
        },
        {
            name: 'warning',
            message: 'Warning state message'
        },
        {
            name: 'information',
            message: 'Information state message'
        }
    ];
}

interface StateOption {
    name: FormStates;
    message: string;
}
