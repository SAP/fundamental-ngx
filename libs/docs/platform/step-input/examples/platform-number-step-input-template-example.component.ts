import { Component } from '@angular/core';
import { FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FdpFormGroupModule, PlatformStepInputModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-number-step-input-template-example',
    templateUrl: './platform-number-step-input-template-example.component.html',
    styleUrls: ['./platform-number-step-input-template-example.component.scss'],
    imports: [FdpFormGroupModule, PlatformStepInputModule, FormsModule]
})
export class PlatformNumberStepInputTemplateFormExampleComponent {
    qty = 10;
    stepInputQtyValidators: ValidatorFn[] = [Validators.required];
}
