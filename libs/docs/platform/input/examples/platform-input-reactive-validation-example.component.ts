import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fdp-platform-input-reactive-validation-example',
    templateUrl: './platform-input-reactive-validation-example.component.html'
})
export class PlatformInputReactiveValidationExampleComponent implements OnInit {
    formGroupRegister: FormGroup;
    submitted = false;
    validate = [Validators.requiredTrue];

    ngOnInit(): void {
        this.formGroupRegister = new FormGroup({});
    }

    hasError(): boolean {
        return this.formGroupRegister.invalid && this.submitted;
    }

    onSubmit(): void {
        // stop here if form is invalid
        if (this.formGroupRegister.invalid) {
            this.submitted = true;
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formGroupRegister.value, null, 4));
    }
}
