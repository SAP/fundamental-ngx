import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Component({
    selector: 'fdp-message-popover-default-example',
    templateUrl: './message-popover-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagePopoverDefaultExampleComponent {
    templateFormValue = {
        input1: '',
        input2: ''
    };

    formGroupRegister: FormGroup;
    submitted = false;
    validate = [Validators.requiredTrue];
    maxValidator = [Validators.max(40)];
    emailValidator = [Validators.email];

    @ViewChild('reactiveForm', { read: FormGroupDirective })
    reactiveForm: FormGroupDirective;

    reactiveFormExample: FormGroup;

    constructor(private _formBuilder: FormBuilder) {
        this.formGroupRegister = new FormGroup({});
        this.reactiveFormExample = this._formBuilder.group({
            name: ['', [Validators.required]],
            password: [
                '',
                [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]
            ],
            email: ['', Validators.compose([Validators.required, Validators.email]), [this.generateAsyncValidator()]]
        });
    }

    generateAsyncValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> =>
            of(control.value === 'john@doe.com' ? null : { maxlength: true }).pipe(delay(500));
    }

    onSubmit(event: Event): void {
        console.log(this.reactiveForm.form.get('emailInput'));

        this.reactiveForm.form.get('emailInput')?.setValue('invalidEmailAddress.com');
        this.reactiveForm.form.get('weeklyHoursInput')?.setValue('400');

        this.reactiveForm.onSubmit(event);

        // stop here if form is invalid
        if (this.formGroupRegister.invalid) {
            this.submitted = true;
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formGroupRegister.value, null, 4));
    }
}
