import { Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-number-step-input-form-example',
    templateUrl: './platform-number-step-input-reactive-example.component.html'
})
export class PlatformNumberStepInputFormExampleComponent {
    form = new FormGroup({});
    stepInputQtyValidators: ValidatorFn[] = [Validators.required];
}
