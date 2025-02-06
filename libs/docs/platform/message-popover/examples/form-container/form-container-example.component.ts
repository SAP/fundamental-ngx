import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformInputModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import {
    FDP_MESSAGE_POPOVER_CONFIG,
    FDP_MESSAGE_POPOVER_DEFAULT_CONFIG,
    MessagePopoverComponent,
    MessagePopoverFormWrapperComponent
} from '@fundamental-ngx/platform/message-popover';

interface MaxErrorModel {
    max: number;
    actual: number;
}

interface MaxLengthErrorModel {
    actualLength: number;
    requiredLength: number;
}

@Component({
    selector: 'fdp-form-container-example',
    templateUrl: './form-container-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MessagePopoverFormWrapperComponent,
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformInputModule,
        PlatformTextAreaModule,
        BarModule,
        MessagePopoverComponent,
        PlatformButtonModule
    ],
    providers: [
        {
            provide: FDP_MESSAGE_POPOVER_CONFIG,
            useValue: FDP_MESSAGE_POPOVER_DEFAULT_CONFIG
        }
    ]
})
export class FormContainerExampleComponent {
    personalInfoForm: FormGroup;
    businessInfoForm: FormGroup;
    submitted = false;
    validate = [Validators.requiredTrue];
    maxValidator = [Validators.max(40)];
    emailValidator = [Validators.email];
    maxLengthValidator = [Validators.maxLength(5)];
    minLengthValidator = [Validators.minLength(5)];

    maxErrorModel: MaxErrorModel;
    maxLengthErrorModel: MaxLengthErrorModel;

    @ViewChild('personal', { read: FormGroupDirective })
    personalForm: FormGroupDirective;

    @ViewChild('business', { read: FormGroupDirective })
    businessForm: FormGroupDirective;

    constructor(private readonly _cd: ChangeDetectorRef) {
        this.personalInfoForm = new FormGroup({});
        this.businessInfoForm = new FormGroup({});
    }

    onSubmit(event: Event): void {
        this.personalForm.form.get('emailInput')?.setValue('invalidEmailAddress.com');
        this.businessForm.form.get('weeklyHoursInput')?.setValue('400');
        this.businessForm.form.get('companyInput')?.setValue('SomeLongCompanyName');
        this.businessForm.form.get('basicInput3')?.setValue('Hi');

        setTimeout(() => {
            this.personalForm.onSubmit(event);
            this.businessForm.onSubmit(event);
            this._cd.detectChanges();
        });
    }
}
