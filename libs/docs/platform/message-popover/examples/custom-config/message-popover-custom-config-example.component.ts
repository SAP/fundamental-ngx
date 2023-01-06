import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FDP_MESSAGE_POPOVER_CONFIG, MessagePopoverConfig } from '@fundamental-ngx/platform/message-popover';

interface MaxErrorModel {
    max: number;
    actual: number;
}

interface MaxLengthErrorModel {
    actualLength: number;
    requiredLength: number;
}

const customErrorsConfig: MessagePopoverConfig = {
    errors: {
        email: {
            heading: 'platformMessagePopover.defaultErrors.email',
            description: 'platformMessagePopover.defaultErrors.email',
            type: 'warning'
        },
        max: {
            heading: 'platformMessagePopover.defaultErrors.max',
            description: 'platformMessagePopover.defaultErrors.max',
            type: 'warning'
        },
        maxlength: {
            heading: 'platformMessagePopover.defaultErrors.maxLength',
            description: 'platformMessagePopover.defaultErrors.maxLength',
            type: 'warning'
        },
        min: {
            heading: 'platformMessagePopover.defaultErrors.min',
            description: 'platformMessagePopover.defaultErrors.min',
            type: 'warning'
        },
        minlength: 'platformMessagePopover.defaultErrors.minLength',
        pattern: 'platformMessagePopover.defaultErrors.pattern',
        required: 'platformMessagePopover.defaultErrors.required'
    }
};

@Component({
    selector: 'fdp-message-popover-custom-config-example',
    templateUrl: './message-popover-custom-config-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // This is done in .withConfig() method of PlatformMessagePopover, and used here for demo purposes only.
        // Do not use it in your application!
        {
            provide: FDP_MESSAGE_POPOVER_CONFIG,
            useValue: customErrorsConfig
        }
    ]
})
export class MessagePopoverCustomConfigExampleComponent {
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
