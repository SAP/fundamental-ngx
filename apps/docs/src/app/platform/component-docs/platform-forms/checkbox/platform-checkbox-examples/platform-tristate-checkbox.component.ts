import { Component, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fdp-tristate-checkbox',
    templateUrl: 'platform-tristate-checkbox.component.html'
})
export class PlatformChekboxTristateComponent implements AfterViewChecked {
    public havana = false;
    public beirut: boolean = null;
    public budapest = 'Yes';
    public lisbon = false;
    public istanbul: boolean = null;
    public busan = true;
    public dubrovnik: boolean = null;
    public jaipur: boolean = null;

    public cities = new FormGroup({});
    public citiesData = new SomeObject(false, 'Yes', null, false, true, null, null, false);

    public registrationForm = new FormGroup({
        agreements: new FormGroup({})
    });

    public choices: Object = { termsAndConditions: true, marketing: true, newsletter: false };

    // code for nested form group with tristate checkbox.
    ngAfterViewChecked(): void {
        this.setAgreementsOnAcceptAllChange();
        this.setControlOnAgreementsChange();
    }

    public checkedChangeFunction(event: any): void {}

    public indeterminateChangeFunction(event: any): void {}

    public changeFunction(event: any): void {}

    private setAgreementsOnAcceptAllChange(): void {
        this.registrationForm.get('acceptAll').valueChanges.subscribe((value) => this.acceptAll(value));
    }

    private setControlOnAgreementsChange(): void {
        this.registrationForm.controls.agreements.valueChanges
            .pipe(
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
            this.registrationForm.controls.agreements.patchValue({
                marketing: accept,
                newsletter: accept,
                termsAndConditions: accept
            });
        }
    }

    private setAcceptAll(value: boolean): void {
        if (this.registrationForm.controls.acceptAll.value !== value) {
            this.registrationForm.patchValue({
                acceptAll: value
            });
        }
    }

    // This is equivalent for `Object.values` not supported by IE11
    private getValuesFromObject(obj: Object): any[] {
        return Object.keys(obj).map((e) => obj[e]);
    }
}

class SomeObject {
    constructor(
        public paris: string | boolean,
        public doha: string | boolean,
        public amsterdam: string | boolean,
        public venice: string | boolean,
        public kyoto: string | boolean,
        public barcelona: string | boolean,
        public athens: string | boolean,
        public sydney: string | boolean
    ) {}
}
