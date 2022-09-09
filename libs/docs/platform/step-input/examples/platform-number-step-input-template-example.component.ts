import { Component } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'fdp-platform-number-step-input-template-example',
    templateUrl: './platform-number-step-input-template-example.component.html',
    styleUrls: ['./platform-number-step-input-template-example.component.scss']
})
export class PlatformNumberStepInputTemplateFormExampleComponent {
    qty = 10;
    stepInputQtyValidators: ValidatorFn[] = [Validators.required];
}
