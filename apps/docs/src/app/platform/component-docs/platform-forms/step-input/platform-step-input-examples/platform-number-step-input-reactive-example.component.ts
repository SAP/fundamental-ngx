import { Component } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

const MAX_VALUE = 20;
const MIN_VALUE = 10;

@Component({
    selector: 'fdp-platform-number-step-input-form-example',
    templateUrl: './platform-number-step-input-reactive-example.component.html'
})
export class PlatformNumberStepInputFormExampleComponent {
    MIN_VALUE = MIN_VALUE;
    MAX_VALUE = MAX_VALUE;
    stepInputQtyValidators: ValidatorFn[] = [Validators.required, Validators.min(MIN_VALUE), Validators.max(MAX_VALUE)];
}
