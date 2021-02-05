import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-number-step-input-state-example',
    templateUrl: './platform-number-step-input-state-example.component.html',
    styleUrls: ['./platform-number-step-input-state-example.component.scss']
})
export class PlatformNumberStepInputStateExampleComponent {
    states = ['default', 'success', 'error', 'warning', 'information'];
}
