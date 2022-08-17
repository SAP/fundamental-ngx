import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-checkbox-error-handling',
    templateUrl: 'platform-checkbox-error-handling.component.html'
})
export class PlatformChekboxStyleComponent {
    customForm = new FormGroup({
        presence: new FormControl(),
        aggrement: new FormControl()
    });
    data = new SomeObject(true, true);
    validators = [Validators.requiredTrue];

    onSubmit(): void {
        alert('Status: ' + this.customForm.status);
    }
}

class SomeObject {
    constructor(public presence: boolean, public aggrement: boolean) {}
}
