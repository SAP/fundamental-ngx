import { Component, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fdp-platform-tristate-checkbox',
    templateUrl: 'platform-tristate-checkbox.component.html'
})
export class PlatformChekboxTristateComponent implements AfterViewInit {
    public havana = false;
    public beirut: boolean | null = null;
    public budapest = 'Yes';
    public lisbon = false;
    public istanbul: boolean | null = null;
    public busan = true;
    public dubrovnik: boolean | null = null;
    public jaipur: boolean | null = null;

    public cities = new FormGroup({});
    public citiesData = new SomeObject(false, 'Yes', null, false, true, null, null, false);

    public agreementsFormGroup = new FormGroup({});

    public registrationForm = new FormGroup({
        agreements: this.agreementsFormGroup
    });

    public choices: Record<string, any> = { termsAndConditions: true, marketing: true, newsletter: false };

    // code for nested form group with tristate checkbox.
    ngAfterViewInit(): void {
        this.setAgreementsOnAcceptAllChange();
        this.setControlOnAgreementsChange();
    }

    private setAgreementsOnAcceptAllChange(): void {
        this.registrationForm.get('acceptAll')?.valueChanges.subscribe((value) => this.acceptAll(value));
    }

    private setControlOnAgreementsChange(): void {
        this.registrationForm
            .get('agreements')?.valueChanges.pipe(
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
            .subscribe((acceptAllValue) => this.setAcceptAll(acceptAllValue));
    }

    private acceptAll(accept: boolean): void {
        if (accept !== null) {
            this.registrationForm.get('agreements')?.patchValue(
                {
                    marketing: accept,
                    newsletter: accept,
                    termsAndConditions: accept
                },
                { emitEvent: false }
            );
        }
    }

    private setAcceptAll(value: boolean | null): void {
        if (this.registrationForm.get('acceptAll')?.value !== value) {
            this.registrationForm.patchValue(
                {
                    acceptAll: value
                },
                { emitEvent: false }
            );
        }
    }

    // This is equivalent for `Object.values` not supported by IE11
    private getValuesFromObject(obj: Record<string, any>): any[] {
        return Object.keys(obj).map((e) => obj[e]);
    }
}

class SomeObject {
    constructor(
        public paris: string | boolean,
        public doha: string | boolean,
        public amsterdam: string | boolean | null,
        public venice: string | boolean,
        public kyoto: string | boolean,
        public barcelona: string | boolean | null,
        public athens: string | boolean | null,
        public sydney: string | boolean
    ) {}
}
