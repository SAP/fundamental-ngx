import { Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ValidatorFn, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-textarea-counter-example',
    templateUrl: './platform-textarea-counter-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformTextareaCounterExampleComponent implements OnInit, AfterViewInit {
    form: FormGroup;
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

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }
}
