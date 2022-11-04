import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';

interface MaxErrorModel {
    max: number;
    actual: number;
}

interface MaxLengthErrorModel {
    actualLength: number;
    requiredLength: number;
}

@Component({
    selector: 'fdp-message-popover-form-container-example',
    templateUrl: './form-container-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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

    constructor() {
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
        });
    }
}
