import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-checkbox-error-handling',
    templateUrl: 'platform-checkbox-error-handling.component.html'
})
export class PlatformChekboxStyleComponent {
    customForm: FormGroup;
    data: SomeObject;
    validators: ValidatorFn[];

    constructor() {
        this.customForm = new FormGroup({});
        this.validators = [Validators.requiredTrue];

        this.data = new SomeObject(true, true);
    }

    onSubmit(): void {
        alert('Status: ' + this.customForm.status);
    }
}

class SomeObject {
    constructor(public presence: boolean, public aggrement: boolean) {}
}
