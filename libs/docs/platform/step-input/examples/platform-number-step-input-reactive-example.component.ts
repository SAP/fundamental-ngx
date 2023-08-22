import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ValidatorFn, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { PlatformStepInputModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

const MAX_VALUE = 20;
const MIN_VALUE = 10;

@Component({
    selector: 'fdp-platform-number-step-input-reactive-example',
    templateUrl: './platform-number-step-input-reactive-example.component.html',
    styleUrls: ['./platform-number-step-input-reactive-example.component.scss'],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformStepInputModule, FormsModule, ReactiveFormsModule, NgIf, JsonPipe]
})
export class PlatformNumberStepInputFormExampleComponent implements AfterViewInit {
    MIN_VALUE = MIN_VALUE;
    MAX_VALUE = MAX_VALUE;
    stepInputQtyValidators: ValidatorFn[] = [Validators.required, Validators.min(MIN_VALUE), Validators.max(MAX_VALUE)];

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
}
