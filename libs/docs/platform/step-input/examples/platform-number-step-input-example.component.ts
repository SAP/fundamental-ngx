import { Component } from '@angular/core';

import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { PlatformStepInputModule, StepInputAlign, StepInputChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-number-step-input-example',
    templateUrl: './platform-number-step-input-example.component.html',
    styleUrls: ['./platform-number-step-input-example.component.scss'],
    imports: [FormLabelComponent, PlatformStepInputModule, ContentDensityDirective]
})
export class PlatformNumberStepInputExampleComponent {
    readonly stepInputAlign = StepInputAlign;

    value = 100;

    onValueChange(event: StepInputChangeEvent): void {
        this.value = event.payload;
    }
}
