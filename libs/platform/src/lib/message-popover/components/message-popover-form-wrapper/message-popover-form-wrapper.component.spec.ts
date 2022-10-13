import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform/message-popover';
import { MessagePopoverErrorGroup } from '../../models/message-popover-error.interface';

import { MessagePopoverFormWrapperComponent } from './message-popover-form-wrapper.component';

@Component({
    template: ` <fdp-message-popover-form-wrapper>
        <form [formGroup]="formGroup" #form>
            <input fdpMessagePopoverFormItem="required" formControlName="required" />
            <input fdpMessagePopoverFormItem="optional" formControlName="optional" />
            <input fdpMessagePopoverFormItem="max" formControlName="max" />
            <input fdpMessagePopoverFormItem="min" formControlName="min" />
            <input fdpMessagePopoverFormItem="true" formControlName="true" />
            <input fdpMessagePopoverFormItem="minLength" formControlName="minLength" />
            <input fdpMessagePopoverFormItem="maxLength" formControlName="maxLength" />
            <input fdpMessagePopoverFormItem="pattern" formControlName="pattern" />
            <input fdpMessagePopoverFormItem="email" formControlName="email" />
        </form>
    </fdp-message-popover-form-wrapper>`
})
export class ReactiveFormTestComponent {
    formGroup: FormGroup;

    @ViewChild('form', { read: FormGroupDirective })
    form: FormGroupDirective;

    @ViewChild(MessagePopoverFormWrapperComponent)
    wrapper: MessagePopoverFormWrapperComponent;

    constructor(private _formBuilder: FormBuilder) {
        this.formGroup = this._formBuilder.group({
            required: ['', [Validators.required]],
            optional: [''],
            max: ['', [Validators.max(10)]],
            min: ['', [Validators.min(10)]],
            true: [true, [Validators.requiredTrue]],
            minLength: [[], [Validators.minLength(10)]],
            maxLength: [[], [Validators.maxLength(10)]],
            pattern: ['', [Validators.pattern(new RegExp('^[aA-zZ]*$'))]],
            email: ['', [Validators.email]]
        });
    }
}

describe('MessagePopoverFormWrapperComponent reactive form', () => {
    let component: ReactiveFormTestComponent;
    let fixture: ComponentFixture<ReactiveFormTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, PlatformMessagePopoverModule, NoopAnimationsModule],
            declarations: [ReactiveFormTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ReactiveFormTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should collect errors on form submit', fakeAsync(() => {
        let groupedErrors: MessagePopoverErrorGroup[] = [];

        component.wrapper.errors.subscribe((errors) => {
            groupedErrors = errors;
        });

        component.formGroup.get('max')?.setValue(11);
        component.formGroup.get('min')?.setValue(9);
        component.formGroup.get('true')?.setValue(false);
        component.formGroup.get('minLength')?.setValue(Array.from(Array(5).keys()));
        component.formGroup.get('maxLength')?.setValue(Array.from(Array(15).keys()));
        component.formGroup.get('pattern')?.setValue('123');
        component.formGroup.get('email')?.setValue('invalid email');

        component.form.onSubmit(new Event('submit'));

        tick(5000);

        fixture.detectChanges();

        expect(groupedErrors[0].errors.length).toEqual(
            Object.values(component.formGroup.controls).filter((control) => !!control.errors).length
        );
    }));
});

@Component({
    template: ` <fdp-message-popover-form-wrapper>
        <form>
            <input fdpMessagePopoverFormItem="required" [(ngModel)]="formGroup.required" name="required" required />
            <input fdpMessagePopoverFormItem="optional" [(ngModel)]="formGroup.optional" name="optional" />
            <input fdpMessagePopoverFormItem="max" type="number" [(ngModel)]="formGroup.max" [max]="10" name="max" />
            <input fdpMessagePopoverFormItem="min" type="number" [(ngModel)]="formGroup.min" [min]="10" name="min" />
            <input fdpMessagePopoverFormItem="true" [(ngModel)]="formGroup.true" requiredTrue name="true" />
            <input
                fdpMessagePopoverFormItem="minLength"
                [(ngModel)]="formGroup.minLength"
                [minLength]="10"
                name="minLength"
            />
            <input
                fdpMessagePopoverFormItem="maxLength"
                [(ngModel)]="formGroup.maxLength"
                [maxLength]="10"
                name="maxLength"
            />
            <input
                fdpMessagePopoverFormItem="pattern"
                [(ngModel)]="formGroup.pattern"
                pattern="^[aA-zZ]*$"
                name="pattern"
            />
            <input fdpMessagePopoverFormItem="email" type="email" [(ngModel)]="formGroup.email" email name="email" />
        </form>
    </fdp-message-popover-form-wrapper>`
})
export class TemplateFormTestComponent {
    formGroup: Record<string, any> = {
        required: '',
        optional: '',
        max: '',
        min: '',
        true: '',
        minLength: [],
        maxLength: [],
        pattern: '',
        email: ''
    };

    @ViewChild(NgForm)
    form: NgForm;

    @ViewChild(MessagePopoverFormWrapperComponent)
    wrapper: MessagePopoverFormWrapperComponent;
}

describe('MessagePopoverFormWrapperComponent template form', () => {
    let component: TemplateFormTestComponent;
    let fixture: ComponentFixture<TemplateFormTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, PlatformMessagePopoverModule, NoopAnimationsModule],
            declarations: [TemplateFormTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TemplateFormTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should collect errors on form submit', fakeAsync(async () => {
        tick(1000);

        let groupedErrors: MessagePopoverErrorGroup[] = [];

        component.wrapper.errors.subscribe((errors) => {
            groupedErrors = errors;
        });

        component.formGroup.max = 11;
        component.formGroup.min = 9;
        component.formGroup.true = false;
        component.formGroup.minLength = Array.from(Array(5).keys());
        component.formGroup.maxLength = Array.from(Array(15).keys());
        component.formGroup.pattern = '123';
        component.formGroup.email = 'invalid email';

        fixture.detectChanges();

        await fixture.whenStable();

        tick(100);

        component.form.onSubmit(new Event('submit'));

        tick(500);

        expect(groupedErrors[0].errors.length).toEqual(
            Object.values(component.form.form.controls).filter((control) => !!control.errors).length
        );
    }));
});
