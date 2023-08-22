import { Component } from '@angular/core';
import { ValidatorFn, Validators, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PlatformStepInputModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-number-step-input-template-example',
    templateUrl: './platform-number-step-input-template-example.component.html',
    styleUrls: ['./platform-number-step-input-template-example.component.scss'],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformStepInputModule, FormsModule, NgIf]
})
export class PlatformNumberStepInputTemplateFormExampleComponent {
    qty = 10;
    stepInputQtyValidators: ValidatorFn[] = [Validators.required];
}
