import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-checkbox-reactive-forms-example',
    template: `
        <form [formGroup]="registrationForm">
            <div>
                <fn-checkbox formControlName="acceptAll" label="Accept all"></fn-checkbox>
            </div>
            <fieldset formGroupName="agreements" style="display:flex;flex-direction:column;width:400px;">
                <fn-checkbox
                    [isGroup]="true"
                    formControlName="termsAndConditions"
                    label="I accept Terms and Conditions"
                ></fn-checkbox>

                <fn-checkbox
                    [isGroup]="true"
                    formControlName="marketing"
                    label="I want to receive Marketing Materials"
                ></fn-checkbox>

                <fn-checkbox
                    [isGroup]="true"
                    formControlName="newsletter"
                    label="I want want to sign for a Newsletter"
                ></fn-checkbox>
            </fieldset>
        </form>

        <p>
            <i>Form value: {{ registrationForm.getRawValue() | json }}</i>
        </p>
    `
})
export class CheckboxReactiveFormsExampleComponent implements OnInit {
    public registrationForm = new FormGroup({
        acceptAll: new FormControl(false),
        agreements: new FormGroup({
            marketing: new FormControl<boolean | undefined>(undefined),
            newsletter: new FormControl(false),
            termsAndConditions: new FormControl(false)
        })
    });

    ngOnInit(): void {
        this.setAgreementsOnAcceptAllChange();
        this.setControlOnAgreementsChange();
    }

    private acceptAll(accept: boolean | null): void {
        this.registrationForm.get('agreements')?.setValue({
            marketing: accept,
            newsletter: accept,
            termsAndConditions: accept
        });
    }

    private setAgreementsOnAcceptAllChange(): void {
        this.registrationForm.get('acceptAll')?.valueChanges.subscribe((value) => this.acceptAll(value));
    }

    private setControlOnAgreementsChange(): void {
        this.registrationForm
            .get('agreements')
            ?.valueChanges.pipe(
                map((agreements) => this.getValuesFromObject(agreements)),
                map((agreementsValues: boolean[]) => {
                    const agreeAll = agreementsValues.reduce((overall, value) => value && overall, true);
                    const declineAll = agreementsValues.reduce((overall, value) => !value && overall, true);
                    if (agreeAll) {
                        return true;
                    } else if (declineAll) {
                        return false;
                    } else {
                        return null;
                    }
                })
            )
            .subscribe((acceptAllValue) =>
                this.registrationForm.get('acceptAll')?.setValue(acceptAllValue, { emitEvent: false })
            );
    }

    // This is equivalent for `Object.values` not supported by IE11
    private getValuesFromObject(obj: Record<string, any>): any[] {
        return Object.keys(obj).map((e) => obj[e]);
    }
}
