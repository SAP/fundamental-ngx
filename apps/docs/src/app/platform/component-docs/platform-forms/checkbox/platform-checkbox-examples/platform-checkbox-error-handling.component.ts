import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, DoCheck } from '@angular/core';

@Component({
    selector: 'fdp-checkbox-error-handling',
    templateUrl: 'platform-checkbox-error-handling.component.html'
})
export class PlatformChekboxStyleComponent implements DoCheck {
    customForm = new FormGroup({
        example1: new FormControl(''),
        example2: new FormControl(true, Validators.requiredTrue)
    });

    formcontrolRef1 = this.customForm.get('example1');
    formcontrolRef2 = this.customForm.get('example2');

    ngDoCheck(): void {
        if (this.formcontrolRef1.value !== true) {
            this.formcontrolRef1.setErrors({ invalid: true });
            this.formcontrolRef1.markAsTouched();
        }
    }

    onSubmit(): void {
        alert('Status: ' + this.formcontrolRef2.status);
    }
}
