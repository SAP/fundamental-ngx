import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ValidatorFn, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-textarea-counter-example',
    templateUrl: './platform-textarea-counter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTextareaCounterExampleComponent implements AfterViewInit {
    form: FormGroup;
    value = 'Lorem ipsum, dolor sit amet';
    private textareaValidator: ValidatorFn[];
    private textareaNoCounterMessageValidator: ValidatorFn[];
    constructor(private _cd: ChangeDetectorRef) {
        this.form = new FormGroup({});

        this.textareaValidator = [Validators.maxLength(10), Validators.required];
        this.textareaNoCounterMessageValidator = [Validators.required];
    }

    onSubmit(): void {
        if (this.form.valid) {
            alert('Submitted successfully');
        }
    }

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }
}
