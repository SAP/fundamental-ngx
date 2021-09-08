import { Component } from '@angular/core';

import { NumberStepInputChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-number-step-input-example',
    templateUrl: './platform-number-step-input-example.component.html',
    styleUrls: ['./platform-number-step-input-example.component.scss']
})
export class PlatformNumberStepInputExampleComponent {
    value = 100;

    onValueChange(event: NumberStepInputChangeEvent): void {
        this.value = event.payload;
    }
}
