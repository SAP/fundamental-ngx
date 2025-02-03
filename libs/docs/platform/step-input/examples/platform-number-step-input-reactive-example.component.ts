import { JsonPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdpFormGroupModule, FormFieldComponent, PlatformStepInputModule } from '@fundamental-ngx/platform/form';

const MAX_VALUE = 20;
const MIN_VALUE = 10;

@Component({
    selector: 'fdp-platform-number-step-input-reactive-example',
    templateUrl: './platform-number-step-input-reactive-example.component.html',
    styleUrls: ['./platform-number-step-input-reactive-example.component.scss'],
    imports: [FdpFormGroupModule, PlatformStepInputModule, FormsModule, ReactiveFormsModule, JsonPipe, ButtonComponent]
})
export class PlatformNumberStepInputFormExampleComponent implements AfterViewInit {
    @ViewChild('formField') formFieldComponent: FormFieldComponent;

    MIN_VALUE = MIN_VALUE;
    MAX_VALUE = MAX_VALUE;
    stepInputQtyValidators: ValidatorFn[] = [Validators.required, Validators.min(MIN_VALUE), Validators.max(MAX_VALUE)];

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    toggleDisable(): void {
        if (this.formFieldComponent.formControl.enabled) {
            this.formFieldComponent.formControl.disable();
        } else {
            this.formFieldComponent.formControl.enable();
        }
    }
}
