import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ValidatorFn, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-textarea-counter-example',
    templateUrl: './platform-textarea-counter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTextareaCounterExampleComponent implements AfterViewInit {
    form: FormGroup;
    textareaValidator: ValidatorFn[];
    textareaNoCounterMessageValidator: ValidatorFn[];
    constructor(private _cd: ChangeDetectorRef) {
        this.form = new FormGroup({
            detailedDescription: new FormControl('Lorem ipsum, dolor sit amet'),
            noCounterMessageInteraction: new FormControl()
        });

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
