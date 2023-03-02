import { Component } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';

@Component({
    selector: 'fdp-platform-number-step-input-state-example',
    templateUrl: './platform-number-step-input-state-example.component.html',
    styleUrls: ['./platform-number-step-input-state-example.component.scss']
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
