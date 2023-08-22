import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ValidatorFn, Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { NgIf, JsonPipe } from '@angular/common';

@Component({
    selector: 'fdp-platform-textarea-counter-example',
    templateUrl: './platform-textarea-counter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformTextAreaModule,
        PlatformButtonModule,
        JsonPipe
    ]
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
