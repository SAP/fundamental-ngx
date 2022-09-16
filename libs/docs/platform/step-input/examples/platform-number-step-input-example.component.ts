import { Component } from '@angular/core';

import { StepInputChangeEvent, StepInputAlign } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-number-step-input-example',
    templateUrl: './platform-number-step-input-example.component.html',
    styleUrls: ['./platform-number-step-input-example.component.scss']
})
export class PlatformNumberStepInputExampleComponent {
    readonly stepInputAlign = StepInputAlign;

    value = 100;

    onValueChange(event: StepInputChangeEvent): void {
        this.value = event.payload;
    }
}
