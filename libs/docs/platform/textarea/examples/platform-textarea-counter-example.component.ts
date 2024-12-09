import { JsonPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-textarea-counter-example',
    templateUrl: './platform-textarea-counter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
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
