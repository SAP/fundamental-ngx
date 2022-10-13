import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormGroupComponent } from '@fundamental-ngx/platform/form';

interface MaxLengthErrorModel {
    max: number;
    actual: number;
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
    trueValidator = [Validators.requiredTrue];

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
        console.log(this.personalForm.form.get('emailInput'));

        this.personalForm.form.get('emailInput')?.setValue('invalidEmailAddress.com');
        this.personalForm.form.get('weeklyHoursInput')?.setValue('400');

        this.personalForm.onSubmit(event);
        this.businessForm.onSubmit(event);
    }
}
