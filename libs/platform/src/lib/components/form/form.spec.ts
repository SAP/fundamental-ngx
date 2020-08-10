import { Component, ViewChild, ElementRef } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { FdpFormGroupModule } from './form-group/fdp-form.module';
import { PlatformInputModule } from './input/fdp-input.module';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormFieldComponent } from './form-group/form-field/form-field.component';
import { FormGroupComponent } from '@fundamental-ngx/core';
import { By } from '@angular/platform-browser';

interface TestUser {
    firstName: string;
    lastName: string;
    favoriteColor: string;
    street?: string;
    city?: string;
    state?: string;
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
                    <fdp-input [formControl]="firstName.formControl" name="firstName"></fdp-input>
                </fdp-form-field>
                <fdp-form-field
                    #lastName
                    id="lastName"
                    label="Last Name"
                    hint="Enter your last name."
                    zone="zTop"
                    required="true"
                >
                    <fdp-input [formControl]="lastName.formControl" name="lastName"></fdp-input>
                </fdp-form-field>
                <fdp-form-field
                    #favoriteColor
                    id="favoriteColor"
                    label="Favorite Color"
                    hint="What is your favorite color?"
                    zone="zBottom"
                >
                    <fdp-input [formControl]="favoriteColor.formControl" name="favoriteColor"></fdp-input>
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

    beforeEach(async(() => {
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
        expect(labels.length).toBe(3);
        expect(labels[0].nativeElement.classList.contains('fd-form-label--required')).toBeTruthy();
        expect(labels[1].nativeElement.classList.contains('fd-form-label--required')).toBeTruthy();
        expect(labels[2].nativeElement.classList.contains('fd-form-label--required')).toBeFalsy();
    });

    it('should be able to automatically register child formControls to parent formGroup', () => {
        const userFormGroup: FormGroup = host.userFormGroup;

        const firstName: FormFieldComponent = host.firstName;
        expect(firstName.formGroup).toBe(userFormGroup);
        const lastName: FormFieldComponent = host.lastName;
        expect(lastName.formGroup).toBe(userFormGroup);
        const favoriteColor: FormFieldComponent = host.favoriteColor;
        expect(favoriteColor.formGroup).toBe(userFormGroup);

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
        <fdp-form-group #userForm
            [object]="user"
            [formGroup]="userFormGroup">
            <fdp-form-field #firstName
                id="firstName"
                label="First Name">
                <fdp-input [formControl]="firstName.formControl" name="firstName"></fdp-input>
            </fdp-form-field>
            <fdp-form-field #lastName
                id="lastName"
                label="Last Name">
                <fdp-input [formControl]="lastName.formControl" name="lastName"></fdp-input>
            </fdp-form-field>
            <fdp-form-field #favoriteColor
                id="favoriteColor"
                label="Favorite Color">
                <fdp-input [formControl]="favoriteColor.formControl" name="favoriteColor"></fdp-input>
            </fdp-form-field>
            <fdp-form-group #addressGroup>
                <fdp-form-field #street
                    id="street"
                    label="Street">
                    <fdp-input [formControl]="street.formControl" name="street"></fdp-input>
                </fdp-form-field>
                <fdp-form-field #lastName id="lastName" label="Last Name">
                    <fdp-input
                        [name]="'input_test5'"
                        [id]="'input_test5'"
                        [formControl]="lastName.formControl"
                    ></fdp-input>
                </fdp-form-field>
                <fdp-form-field #favoriteColor id="favoriteColor" label="Favorite Color">
                    <fdp-input
                        [name]="'input_test6'"
                        [id]="'input_test6'"
                        [formControl]="favoriteColor.formControl"
                    ></fdp-input>
                </fdp-form-field>
                <fdp-form-group #addressGroup>
                    <fdp-form-field #street id="street" label="Street">
                        <fdp-input
                            [name]="'input_test7'"
                            [id]="'input_test7'"
                            [formControl]="street.formControl"
                        ></fdp-input>
                    </fdp-form-field>
                    <fdp-form-field #city id="city" label="City">
                        <fdp-input
                            [name]="'input_test8'"
                            [id]="'input_test8'"
                            [formControl]="city.formControl"
                        ></fdp-input>
                    </fdp-form-field>
                    <fdp-form-field #state id="state" label="State">
                        <fdp-input
                            [name]="'input_test9'"
                            [id]="'input_test9'"
                            [formControl]="state.formControl"
                        ></fdp-input>
                    </fdp-form-field>
                </fdp-form-group>
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

    public userFormGroup: FormGroup = new FormGroup({});

    public user: TestUser = {
        firstName: 'Angelica',
        lastName: 'Mercado',
        favoriteColor: 'red',
        street: '123 Main St',
        city: 'Springfield',
        state: 'AK'
    };

    public result: any = null;

    onSubmit(): void {
        this.result = this.userFormGroup.getRawValue();
    }
}

describe('Nested Form Groups', () => {
    let fixture: ComponentFixture<NestedFormGroupsTestComponent>;
    let host: NestedFormGroupsTestComponent;

    beforeEach(async(() => {
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

        const firstName: FormFieldComponent = host.firstName;
        expect(firstName.formGroup).toBe(userFormGroup);
        const lastName: FormFieldComponent = host.lastName;
        expect(lastName.formGroup).toBe(userFormGroup);
        const favoriteColor: FormFieldComponent = host.favoriteColor;
        expect(favoriteColor.formGroup).toBe(userFormGroup);

        expect(userFormGroup.contains('firstName')).toBeTruthy();
        expect(userFormGroup.contains('lastName')).toBeTruthy();
        expect(userFormGroup.contains('favoriteColor')).toBeTruthy();
    });

    it('should emit "onSubmit" event on click of a child submit button', () => {
        const submitButton = host.submitButton.nativeElement;
        submitButton.click();
        fixture.detectChanges();

        expect(host.result).toEqual({
            firstName: 'Angelica',
            lastName: 'Mercado',
            favoriteColor: 'red',
            street: '123 Main St',
            city: 'Springfield',
            state: 'AK'
        });
    });
});
