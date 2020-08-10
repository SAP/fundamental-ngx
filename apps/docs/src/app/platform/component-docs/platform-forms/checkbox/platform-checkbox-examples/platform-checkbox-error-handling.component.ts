import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'fdp-checkbox-error-handling',
    templateUrl: 'platform-checkbox-error-handling.component.html'
})
export class PlatformChekboxStyleComponent implements AfterViewInit {
    customForm: FormGroup;
    data: SomeObject;
    validators: ValidatorFn[];

    constructor(private _cd: ChangeDetectorRef) {
        this.customForm = new FormGroup({});
        this.validators = [Validators.requiredTrue];

        this.data = new SomeObject(true, true);
    }

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }
    onSubmit(): void {
        alert('Status: ' + this.customForm.status);
    }
}

class SomeObject {
    constructor(public presence: boolean, public aggrement: boolean) {}
}
