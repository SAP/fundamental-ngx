import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild, inject } from '@angular/core';
import { By } from '@angular/platform-browser';

import { whenStable } from '@fundamental-ngx/core/tests';
import { DynamicFormFieldItem } from '../interfaces/dynamic-form-item';
import { FormGeneratorComponent } from './form-generator.component';
import { FormGeneratorService } from '../form-generator.service';
import { PlatformFormGeneratorModule } from '../fdp-form-generator.module';
import { BehaviorSubject, filter } from 'rxjs';
import { DynamicFormGroup } from '../interfaces/dynamic-form-group';

@Component({
    template: `
        <fdp-form-generator
            [formItems]="formItems"
            [mainTitle]="formTitle"
            (formSubmitted)="onFormSubmitted($event)"
            (formCreated)="onFormCreated($event)"
        ></fdp-form-generator>
    `,
    standalone: true,
    imports: [PlatformFormGeneratorModule]
})
export class HostComponent {
    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    formCreated = false;

    form: DynamicFormGroup;

    formValue: { [key: string]: any };

    formTitle = 'Test form title';

    private _formCreatedSubj = new BehaviorSubject<boolean>(false);

    formCreated$ = this._formCreatedSubj.pipe(filter((value) => value));

    service = inject(FormGeneratorService);

    formItems: DynamicFormFieldItem[] = [
        {
            name: 'firstQuestion',
            message: 'First question',
            type: 'input',
            validate: (value) => (value === 25 ? null : 'Should be 25')
        }
    ];

    onFormCreated(form: DynamicFormGroup): void {
        this.formCreated = true;
        this.form = form;
        this._formCreatedSubj.next(true);
    }

    onFormSubmitted(formValue): void {
        this.formValue = formValue;
    }

    submitForm(): void {
        this.formGenerator.submit();
    }
}

describe('FormGeneratorComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
    let service: FormGeneratorService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        service = component.service;
        fixture.detectChanges();
        await whenStable(fixture);
    });

    it('should render form title', (doneFn) => {
        component.formCreated$.subscribe(() => {
            expect(
                fixture.debugElement.query(By.css('.fd-form-header__text')).nativeElement.textContent?.trim()
            ).toEqual(component.formTitle);
            doneFn();
        });
    });

    it('should create form', (doneFn) => {
        component.formCreated$.subscribe(() => {
            expect(component.formCreated).toBeTruthy();
            doneFn();
        });
    });

    it('should create form and pass form object', (doneFn) => {
        component.formCreated$.subscribe(() => {
            expect(component.form.controls).toBeTruthy();
            doneFn();
        });
    });

    it('should submit form programmatically', (doneFn) => {
        component.formCreated$.subscribe(async () => {
            const control = service.getFormControl(component.form, 'firstQuestion');
            control.setValue(25);

            await new Promise((resolve) => setTimeout(() => resolve(null), 20));

            component.submitForm();

            await new Promise((resolve) => setTimeout(() => resolve(null), 200));
            fixture.detectChanges();

            expect(component.formValue).toBeTruthy();
            doneFn();
        });
    });

    it('should not emit form value if form is invalid', (doneFn) => {
        component.formCreated$.subscribe(async () => {
            const control = service.getFormControl(component.form, 'firstQuestion');
            control.setValue(0);

            await new Promise((resolve) => setTimeout(() => resolve(null), 20));

            component.submitForm();

            await new Promise((resolve) => setTimeout(() => resolve(null), 200));
            fixture.detectChanges();

            expect(component.formValue).toBeFalsy();
            doneFn();
        });
    });
});
