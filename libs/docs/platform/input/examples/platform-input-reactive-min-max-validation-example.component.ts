import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { PlatformInputModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

const MAX_VALUE = 10;
const MIN_VALUE = 5;

@Component({
    selector: 'fdp-platform-input-reactive-min-max-validation-example',
    templateUrl: './platform-input-reactive-min-max-validation-example.component.html',
    standalone: true,
    imports: [FormsModule, FdpFormGroupModule, PlatformInputModule, ReactiveFormsModule, NgIf, JsonPipe]
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
