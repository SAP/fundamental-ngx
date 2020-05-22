import { Component, OnInit, AfterViewChecked, DoCheck, Input } from '@angular/core';
import { FormGroup, FormControl, ControlContainer } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fdp-tristate-checkbox',
    templateUrl: 'platform-tristate-checkbox.component.html'
})
export class PlatformChekboxTristateComponent implements AfterViewChecked, OnInit, DoCheck {
    public havana: boolean = false;
    public beirut: boolean = null;
    public budapest: string = 'Yes';
    public lisbon: boolean = false;
    public istanbul: boolean = null;
    public busan: boolean = true;
    public dubrovnik: boolean = null;
    public jaipur: boolean = null;

    public cities = new FormGroup({});
    public citiesData = new SomeObject(false, 'Yes', null, false, true, null, null, false);

    public registrationForm = new FormGroup({
        agreements: new FormGroup({})
    });

    public choices: Object = { termsAndConditions: true, marketing: true, newsletter: true };

    ngOnInit(): void {
        this.setAgreementsOnAcceptAllChange();
        // this.setControlOnAgreementsChange();
    }
    ngDoCheck(): void {
        console.log('registrationForm: ', this.registrationForm);
    }
    ngAfterViewChecked(): void {}

    public save(event: any) {
        console.log('save data: registrationForm: ', this.registrationForm);
    }

    public save1(event: any) {
        console.log('save1 data: registrationForm: ', this.registrationForm);
    }

    private acceptAll(accept: boolean): void {
        console.log('acceptAll: ');
        // this.agreements.setValue({
        //     marketing: accept,
        //     newsletter: accept,
        //     termsAndConditions: accept
        // });
    }

    private setAgreementsOnAcceptAllChange(): void {
        // this.registrationForm.get('acceptAll').valueChanges.subscribe((value) => this.acceptAll(value));
    }

    private setControlOnAgreementsChange(): void {
        // this.agreements.valueChanges
        //     .pipe(
        //         map((agreements) => this.getValuesFromObject(agreements)),
        //         map((agreementsValues: boolean[]) => {
        //             const agreeAll = agreementsValues.reduce((overall, value) => value && overall, true);
        //             const declineAll = agreementsValues.reduce((overall, value) => !value && overall, true);
        //             if (agreeAll) {
        //                 return true;
        //             } else if (declineAll) {
        //                 return false;
        //             } else {
        //                 return null;
        //             }
        //         })
        //     )
        //     .subscribe((acceptAllValue) => console.log('this.registrationForm: ', this.registrationForm));
    }

    // This is equivalent for `Object.values` not supported by IE11
    private getValuesFromObject(obj: Object): any[] {
        return Object.keys(obj).map((e) => obj[e]);
    }
}

@Component({
    selector: 'fdp-tristate-checkbox-choices',
    template: `
        <fdp-form-group #ffg1 [id]="'agreementGroup'" [formGroup]="agreements" [object]="choice">
            <fdp-form-field #ffr1 [id]="'termsAndConditions'" zone="zLeft" rank="3">
                <fdp-checkbox
                    [name]="'termsAndConditions'"
                    [isBinary]="true"
                    [label]="'I accept Terms and Conditions'"
                    [formControl]="ffr1.formControl"
                ></fdp-checkbox>
            </fdp-form-field>

            <!-- <fdp-form-field #ffr2 [id]="'marketing'" zone="zLeft" rank="3">
                <fdp-checkbox
                    [name]="'marketing'"
                    [isBinary]="true"
                    [label]="'I want to receive Marketing Materials'"
                    [formControl]="ffr2.formControl"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field #ffr3 [id]="'newsletter'" zone="zLeft" rank="4">
                <fdp-checkbox
                    [name]="'newsletter'"
                    [isBinary]="true"
                    [label]="'I want want to sign for a Newsletter'"
                    [formControl]="ffr3.formControl"
                ></fdp-checkbox>
            </fdp-form-field> -->
        </fdp-form-group>
    `
})
export class PlatformChekboxTristateChoicesComponent implements DoCheck {
    @Input()
    choice: Object;

    public agreements = new FormGroup({});
    constructor(public controlContainer: ControlContainer) {}

    ngDoCheck(): void {
        console.log('agreements: ', this.agreements);
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
