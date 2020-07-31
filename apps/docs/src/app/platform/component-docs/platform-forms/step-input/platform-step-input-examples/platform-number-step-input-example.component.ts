import { Component } from '@angular/core';
import { NumberStepInputChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-number-step-input-example',
    templateUrl: './platform-number-step-input-example.component.html'
})
export class PlatformNumberStepInputExampleComponent {
    value = 100;

    onValueChange(event: NumberStepInputChangeEvent) {
        this.value = event.payload;
    }
}
