import { Component, ViewChild, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormGroupComponent } from '@fundamental-ngx/platform';

import { FdpFormGroupModule } from './form-group/fdp-form.module';
import { PlatformInputModule } from './input/fdp-input.module';
import { FormFieldComponent } from './form-group/form-field/form-field.component';

interface TestUser {
    firstName: string;
    lastName: string;
    favoriteColor: string;
    address?: {
        street: string;
        city: string;
        state: string;
    };
}

@Component({
    template: `
        <form [formGroup]="userFormGroup" (ngSubmit)="onSubmit()">
            <fdp-form-group
                #userForm
                [object]="user"
                [formGroup]="userFormGroup"
                [hintPlacement]="'right'"
                [i18Strings]="i18n"
            >
                <fdp-form-field
                    #firstName
                    id="firstName"
                    label="First Name"
                    hint="Enter your first name."
                    zone="zTop"
                    required="true"
                >
                    <fdp-input name="firstName" [formControl]="firstName.formControl"></fdp-input>
                </fdp-form-field>
                <fdp-form-field
                    #lastName
                    id="lastName"
                    label="Last Name"
                    hint="Enter your last name."
                    zone="zTop"
                    required="true"
                >
                    <fdp-input name="lastName" [formControl]="lastName.formControl"></fdp-input>
                </fdp-form-field>
                <fdp-form-field
                    #favoriteColor
                    id="favoriteColor"
                    label="Favorite Color"
                    hint="What is your favorite color?"
                    zone="zBottom"
                >
                    <fdp-input name="favoriteColor" [formControl]="favoriteColor.formControl"></fdp-input>
                </fdp-form-field>
                <ng-template #i18n let-errors>
                    <span *ngIf="errors && errors.required" class="error">This field is required.</span>
                </ng-template>
            </fdp-form-group>
            <button type="submit" #submitButton>Submit</button>
        </form>
    `
})
class SimpleFormTestComponent {
    @ViewChild('userForm') userForm: FormGroupComponent;
    @ViewChild('firstName') firstName: FormFieldComponent;
    @ViewChild('lastName') lastName: FormFieldComponent;
    @ViewChild('favoriteColor') favoriteColor: FormFieldComponent;

    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    public userFormGroup: FormGroup = new FormGroup({});

    public user: TestUser = {
        firstName: 'Tom',
        lastName: 'Tiny',
        favoriteColor: 'blue'
    };

    public result: any = null;

    onSubmit(): void {
        this.result = this.userFormGroup.value;
    }
}

describe('Simple Form', () => {
    let fixture: ComponentFixture<SimpleFormTestComponent>;
    let host: SimpleFormTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformInputModule],
            declarations: [SimpleFormTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleFormTestComponent);
        host = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should display the field labels by default', () => {
        const labels: ElementRef<HTMLElement>[] = fixture.debugElement.queryAll(By.css('label'));
        expect(labels.length).toBe(3);
        expect(labels[0].nativeElement.textContent).toBe('First Name');
        expect(labels[1].nativeElement.textContent).toBe('Last Name');
        expect(labels[2].nativeElement.textContent).toBe('Favorite Color');
    });

    it('should highlight the required fields', () => {
        const labels: ElementRef<HTMLElement>[] = fixture.debugElement.queryAll(By.css('label'));
        const getFormLabelElement = (label: ElementRef<HTMLElement>) => fixture.debugElement.query(By.css('span')).nativeElement;
        expect(labels.length).toBe(3);
        expect(getFormLabelElement(labels[0]).classList.contains('fd-form-label--required')).toBeTruthy();
        expect(getFormLabelElement(labels[1]).classList.contains('fd-form-label--required')).toBeTruthy();
        expect(getFormLabelElement(labels[2]).classList.contains('fd-form-label--required')).toBeTruthy();
    });

    it('should be able to automatically register child formControls to parent formGroup', () => {
        const userFormGroup: FormGroup = host.userFormGroup;

        const firstName: FormFieldComponent = host.firstName;
        expect(firstName.formGroupContainer.formGroup).toBe(userFormGroup);
        const lastName: FormFieldComponent = host.lastName;
        expect(lastName.formGroupContainer.formGroup).toBe(userFormGroup);
        const favoriteColor: FormFieldComponent = host.favoriteColor;
        expect(favoriteColor.formGroupContainer.formGroup).toBe(userFormGroup);

        expect(userFormGroup.contains('firstName')).toBeTruthy();
        expect(userFormGroup.contains('lastName')).toBeTruthy();
        expect(userFormGroup.contains('favoriteColor')).toBeTruthy();
    });

    it('should be able to have default values set via the "object" property.', () => {
        const firstName = host.firstName.formControl.value;
        expect(firstName).toBe('Tom');
        const lastName = host.lastName.formControl.value;
        expect(lastName).toBe('Tiny');
        const favoriteColor = host.favoriteColor.formControl.value;
        expect(favoriteColor).toBe('blue');
    });

    it('should emit "onSubmit" event on click of a child submit button', () => {
        const submitButton = host.submitButton.nativeElement;
        submitButton.click();
        fixture.detectChanges();

        expect(host.result).toEqual({
            firstName: 'Tom',
            lastName: 'Tiny',
            favoriteColor: 'blue'
        });
    });
});

@Component({
    template: `
        <form [formGroup]="userFormGroup" (ngSubmit)="onSubmit()">
            <fdp-form-group #userForm [formGroup]="userFormGroup" [object]="user">
                <fdp-form-field #firstName id="firstName" label="First Name">
                    <fdp-input name="firstName" [formControl]="firstName.formControl"></fdp-input>
                </fdp-form-field>
                <fdp-form-field #lastName id="lastName" label="Last Name">
                    <fdp-input name="lastName" [formControl]="lastName.formControl"></fdp-input>
                </fdp-form-field>
                <fdp-form-field #favoriteColor id="favoriteColor" label="Favorite Color">
                    <fdp-input name="favoriteColor" [formControl]="favoriteColor.formControl"></fdp-input>
                </fdp-form-field>
                <fdp-form-group #addressGroup [formGroup]="userFormGroup.get('address')" [object]="user.address">
                    <fdp-form-field #street id="street" label="Street">
                        <fdp-input name="street" [formControl]="street.formControl"></fdp-input>
                    </fdp-form-field>
                    <fdp-form-field #city id="city" label="City">
                        <fdp-input name="city" [formControl]="city.formControl"></fdp-input>
                    </fdp-form-field>
                    <fdp-form-field #state id="state" label="State">
                        <fdp-input name="state" [formControl]="state.formControl"></fdp-input>
                    </fdp-form-field>
                </fdp-form-group>
            </fdp-form-group>
            <button type="submit" #submitButton>Submit</button>
        </form>
    `
})
class NestedFormGroupsTestComponent {
    @ViewChild('userForm') userForm: FormGroupComponent;
    @ViewChild('firstName') firstName: FormFieldComponent;
    @ViewChild('lastName') lastName: FormFieldComponent;
    @ViewChild('favoriteColor') favoriteColor: FormFieldComponent;

    @ViewChild('addressGroup') addressGroup: FormGroupComponent;
    @ViewChild('street') street: FormFieldComponent;
    @ViewChild('city') city: FormFieldComponent;
    @ViewChild('state') state: FormFieldComponent;

    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    public userFormGroup: FormGroup = new FormGroup({
        address: new FormGroup({})
    });

    public user: TestUser = {
        firstName: 'Angelica',
        lastName: 'Mercado',
        favoriteColor: 'red',
        address: {
            street: '123 Main St',
            city: 'Springfield',
            state: 'AK'
        }
    };

    public result: any = null;

    onSubmit(): void {
        this.result = this.userFormGroup.value;
    }
}

describe('Nested Form Groups', () => {
    let fixture: ComponentFixture<NestedFormGroupsTestComponent>;
    let host: NestedFormGroupsTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformInputModule],
            declarations: [NestedFormGroupsTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NestedFormGroupsTestComponent);
        host = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be able to automatically register child formControls to parent formGroup', () => {
        const userFormGroup: FormGroup = host.userFormGroup;
        const addressGroup: FormGroup = userFormGroup.get('address') as FormGroup;

        expect(userFormGroup.contains('firstName')).toBeTruthy();
        expect(userFormGroup.contains('lastName')).toBeTruthy();
        expect(userFormGroup.contains('favoriteColor')).toBeTruthy();
        // Child address group controls
        expect(addressGroup.contains('street')).toBeTruthy();
        expect(addressGroup.contains('city')).toBeTruthy();
        expect(addressGroup.contains('state')).toBeTruthy();
    });

    it('should render nested form group controls as well', () => {
        const street = fixture.debugElement.query(By.css('#street'));
        expect(street.nativeElement).toBeTruthy();

        const city = fixture.debugElement.query(By.css('#city'));
        expect(city.nativeElement).toBeTruthy();

        const state = fixture.debugElement.query(By.css('#state'));
        expect(state.nativeElement).toBeTruthy();
    });

    it('should emit "onSubmit" event on submit button click', () => {
        const submitButton = host.submitButton.nativeElement;
        submitButton.click();
        fixture.detectChanges();

        expect(host.result).toEqual({
            firstName: 'Angelica',
            lastName: 'Mercado',
            favoriteColor: 'red',
            address: {
                street: '123 Main St',
                city: 'Springfield',
                state: 'AK'
            }
        });
    });
});
