import { Component } from '@angular/core';

import { StepInputChangeEvent, StepInputAlign } from '@fundamental-ngx/platform/form';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformStepInputModule } from '@fundamental-ngx/platform/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fdp-platform-number-step-input-example',
    templateUrl: './platform-number-step-input-example.component.html',
    styleUrls: ['./platform-number-step-input-example.component.scss'],
    standalone: true,
    imports: [FormLabelModule, PlatformStepInputModule, ContentDensityDirective]
})
export class PlatformNumberStepInputExampleComponent {
    readonly stepInputAlign = StepInputAlign;

    value = 100;

    onValueChange(event: StepInputChangeEvent): void {
        this.value = event.payload;
    }
}
