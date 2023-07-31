import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FdpFormGroupModule } from './form-group/fdp-form.module';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormFieldComponent } from './form-group/form-field/form-field.component';
import { PlatformInputModule } from './input/fdp-input.module';

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

describe('Platform Form', () => {
    @Component({
        template: `
            <form [formGroup]="userFormGroup" (ngSubmit)="onSubmit()">
                <fdp-form-group #userForm [object]="user" [formGroup]="userFormGroup" [i18Strings]="i18n">
                    <fdp-form-field
                        *ngIf="showFirstNameControl"
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
        @ViewChild('userForm') userFormGroupCmp: FormGroupComponent;
        @ViewChild('firstName') firstNameFormField: FormFieldComponent;
        @ViewChild('lastName') lastNameFormField: FormFieldComponent;
        @ViewChild('favoriteColor') favoriteColorFormField: FormFieldComponent;

        @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

        userFormGroup: FormGroup = new FormGroup({});

        user: TestUser = {
            firstName: 'Tom',
            lastName: 'Tiny',
            favoriteColor: 'blue'
        };

        result: any = null;

        showFirstNameControl = true;

        onSubmit(): void {
            this.result = this.userFormGroup.value;
        }
    }

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

    it('should display field labels', () => {
        const labels: ElementRef<HTMLElement>[] = fixture.debugElement.queryAll(By.css('label'));
        const labelTextContentList = labels.map(({ nativeElement }) => nativeElement.textContent);

        expect(labelTextContentList).toContain('First Name');
        expect(labelTextContentList).toContain('Last Name');
        expect(labelTextContentList).toContain('Favorite Color');
    });

    it('should display input controls in right order', () => {
        const inputs: ElementRef<HTMLElement>[] = fixture.debugElement.queryAll(By.css('input'));

        expect(inputs[0].nativeElement.id).toBe('firstName');
        expect(inputs[1].nativeElement.id).toBe('lastName');
        expect(inputs[2].nativeElement.id).toBe('favoriteColor');
    });

    it('should highlight the required fields', () => {
        const labels: DebugElement[] = fixture.debugElement.queryAll(By.css('label'));
        const getFormLabelElement = (label: DebugElement): HTMLElement =>
            label.query(By.css('span')).nativeElement as HTMLElement;

        expect(getFormLabelElement(labels[0]).classList.contains('fd-form-label--required')).toBe(true);
        expect(getFormLabelElement(labels[1]).classList.contains('fd-form-label--required')).toBe(true);
        expect(getFormLabelElement(labels[2]).classList.contains('fd-form-label--required')).toBe(false);
    });

    it('should register formField into formGroup', () => {
        const userFormGroup: FormGroup = host.userFormGroup;

        const firstName: FormFieldComponent = host.firstNameFormField;
        expect(firstName.formGroupContainer.formGroup).toBe(userFormGroup);
        expect(userFormGroup.contains('firstName')).toBe(true);

        const lastName: FormFieldComponent = host.lastNameFormField;
        expect(lastName.formGroupContainer.formGroup).toBe(userFormGroup);
        expect(userFormGroup.contains('lastName')).toBe(true);

        const favoriteColor: FormFieldComponent = host.favoriteColorFormField;
        expect(favoriteColor.formGroupContainer.formGroup).toBe(userFormGroup);
        expect(userFormGroup.contains('favoriteColor')).toBe(true);
    });

    it('should unregister formField from formGroup', () => {
        host.showFirstNameControl = false;
        fixture.detectChanges();
        // no control in DOM
        expect(fixture.debugElement.query(By.css('#firstName'))).toBeFalsy();
        // no data in form group
        expect(host.userFormGroup.contains('firstName')).toBe(false);

        let inputs: ElementRef<HTMLElement>[];
        inputs = fixture.debugElement.queryAll(By.css('input'));
        // first control becomes "lastName"
        expect(inputs[0].nativeElement.id).toBe('lastName');

        // Enable firstName
        host.showFirstNameControl = true;
        fixture.detectChanges();
        // control appears in DOM
        expect(fixture.debugElement.query(By.css('#firstName'))).toBeTruthy();
        inputs = fixture.debugElement.queryAll(By.css('input'));
        // first control becomes "firstName" again
        expect(inputs[0].nativeElement.id).toBe('firstName');
    });

    it('should have default values set via the "object" property.', () => {
        const firstName = host.firstNameFormField.formControl.value;
        expect(firstName).toBe('Tom');
        const lastName = host.lastNameFormField.formControl.value;
        expect(lastName).toBe('Tiny');
        const favoriteColor = host.favoriteColorFormField.formControl.value;
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

describe('Nested Form Groups', () => {
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
                    <fdp-form-field-group>
                        <fdp-form-field #favoriteColor id="favoriteColor" label="Favorite Color">
                            <fdp-input name="favoriteColor" [formControl]="favoriteColor.formControl"></fdp-input>
                        </fdp-form-field>
                    </fdp-form-field-group>
                    <!-- Nested Group -->
                    <fdp-form-group #addressGroup [formGroup]="userFormGroup.get('address')" [object]="user.address">
                        <fdp-form-field #state id="state" label="State">
                            <fdp-input name="state" [formControl]="state.formControl"></fdp-input>
                        </fdp-form-field>
                        <fdp-form-field #city id="city" label="City">
                            <fdp-input name="city" [formControl]="city.formControl"></fdp-input>
                        </fdp-form-field>
                        <fdp-form-field-group>
                            <fdp-form-field #street id="street" label="Street">
                                <fdp-input name="street" [formControl]="street.formControl"></fdp-input>
                            </fdp-form-field>
                        </fdp-form-field-group>
                    </fdp-form-group>
                </fdp-form-group>
                <button type="submit" #submitButton>Submit</button>
            </form>
        `
    })
    class NestedFormGroupsTestComponent {
        @ViewChild('userForm') userGroup: FormGroupComponent;

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

    it('should render nested form group controls in right order', () => {
        const nestedGroupDebugElement = fixture.debugElement.query(By.css('fdp-form-group fdp-form-group'));
        const nestedGroupElement: HTMLElement = nestedGroupDebugElement.nativeElement;

        // Check labels
        const allLabels = fixture.debugElement.queryAll(By.css('.fd-form-label'));
        expect(allLabels.length).toBe(6);

        const nestedGroupLabels = nestedGroupDebugElement.queryAll(By.css('.fd-form-label'));
        expect(nestedGroupLabels.length).toBe(3);
        expect(nestedGroupLabels[0].nativeElement.textContent).toEqual('State');
        expect(nestedGroupLabels[1].nativeElement.textContent).toEqual('City');
        expect(nestedGroupLabels[2].nativeElement.textContent).toEqual('Street');

        // Check inputs
        const streetInputs = fixture.debugElement.queryAll(By.css('input#street'));
        expect(streetInputs.length).toBe(1);
        expect(nestedGroupElement.contains(streetInputs[0].nativeElement)).toBeTruthy();

        const cityInputs = fixture.debugElement.queryAll(By.css('input#city'));
        expect(cityInputs.length).toBe(1);
        expect(nestedGroupElement.contains(cityInputs[0].nativeElement)).toBeTruthy();

        const stateInputs = fixture.debugElement.queryAll(By.css('input#state'));
        expect(stateInputs.length).toBe(1);
        expect(nestedGroupElement.contains(stateInputs[0].nativeElement)).toBeTruthy();
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

describe('fdp-form-field out of fdp-form-group', () => {
    @Component({
        template: `
            <form [formGroup]="userFormGroup" (ngSubmit)="onSubmit()">
                <fdp-form-group #fdpUserFormGroup [object]="user" [formGroup]="userFormGroup" [i18Strings]="i18n">
                    <ng-container
                        *ngTemplateOutlet="formFieldTemplateRef; context: { fdpFormGroup: fdpUserFormGroup }"
                    ></ng-container>

                    <ng-template #i18n let-errors>
                        <span *ngIf="errors && errors.required" class="error">This field is required.</span>
                    </ng-template>
                </fdp-form-group>
            </form>
            <ng-template #formFieldTemplateRef let-fdpFormGroup="fdpFormGroup">
                <fdp-form-field
                    #formFieldFirstName
                    id="firstName"
                    label="First Name"
                    required="true"
                    [formGroupContainer]="fdpFormGroup"
                >
                    <fdp-input name="firstName" [formControl]="formFieldFirstName.formControl"></fdp-input>
                </fdp-form-field>
            </ng-template>
        `
    })
    class HostFormComponent {
        @ViewChild('fdpUserFormGroup') fdpFormGroupUser: FormGroupComponent;
        @ViewChild('formFieldFirstName') fdpFormFieldFirstName: FormFieldComponent;

        public userFormGroup: FormGroup = new FormGroup({});

        public user = {
            firstName: 'Tom'
        };

        public result: any = null;

        onSubmit(): void {
            this.result = this.userFormGroup.value;
        }
    }

    let fixture: ComponentFixture<HostFormComponent>;
    let host: HostFormComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformInputModule],
            declarations: [HostFormComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostFormComponent);
        host = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(host).toBeDefined();
    });

    it('should link formField to given formGroup through [formGroupContainer] input', () => {
        const fdpFormGroup: FormGroupComponent = host.fdpFormGroupUser;
        const fdpFormField: FormFieldComponent = host.fdpFormFieldFirstName;

        expect(fdpFormGroup).toBeDefined();
        expect(fdpFormField).toBeDefined();
        expect(fdpFormField.formGroupContainer).toBe(fdpFormGroup);
    });
});

describe('FdpFormField with Wrapper', () => {
    @Component({
        selector: 'fdp-wrapper',
        template: ''
    })
    class WrapperComponent {}

    @Component({
        template: `
            <fdp-form-group #fg>
                <ng-container *ngTemplateOutlet="fields; context: { $implicit: fg }"> </ng-container>

                <ng-template #fields let-fg>
                    <fdp-wrapper>
                        <fdp-form-field
                            #ff
                            [formGroupContainer]="fg"
                            label="Default Input Field"
                            id="input1"
                            name="input1"
                        >
                            <fdp-input name="input1" [formControl]="ff.formControl"></fdp-input>
                        </fdp-form-field>
                    </fdp-wrapper>
                </ng-template>
            </fdp-form-group>
        `
    })
    class HostFormComponent {}

    let fixture: ComponentFixture<HostFormComponent>;
    let host: HostFormComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformInputModule],
            declarations: [WrapperComponent, HostFormComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostFormComponent);
        host = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(host).toBeDefined();
    });

    it('should render form control when formField is wrapped in', () => {
        // Label
        const label = fixture.debugElement.query(By.css('.fd-form-label'));
        expect(label.nativeElement.textContent).toEqual('Default Input Field');

        // Input
        const input = fixture.debugElement.query(By.css('input#input1'));
        expect(input).toBeTruthy();
    });
});
