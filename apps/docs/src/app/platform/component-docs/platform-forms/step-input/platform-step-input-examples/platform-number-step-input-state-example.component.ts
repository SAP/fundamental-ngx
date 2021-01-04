import { Component } from '@angular/core';
import { NumberStepInputChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-number-step-input-state-example',
    templateUrl: './platform-number-step-input-state-example.component.html'
})
export class PlatformNumberStepInputStateExampleComponent {
    states = ['default', 'success', 'error', 'warning', 'information'];
}
