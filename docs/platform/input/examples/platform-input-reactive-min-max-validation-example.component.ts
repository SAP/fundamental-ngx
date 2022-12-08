import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

const MAX_VALUE = 10;
const MIN_VALUE = 5;

@Component({
    selector: 'fdp-platform-input-reactive-min-max-validation-example',
    templateUrl: './platform-input-reactive-min-max-validation-example.component.html'
})
export class PlatformInputReactiveMinMaxValidationExampleComponent implements AfterViewInit {
    formGroupRegister: FormGroup;
    submitted = false;
    MIN_VALUE = MIN_VALUE;
    MAX_VALUE = MAX_VALUE;
    inputValidator: ValidatorFn[] = [
        Validators.required,
        Validators.minLength(MIN_VALUE),
        Validators.maxLength(MAX_VALUE)
    ];

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
}
