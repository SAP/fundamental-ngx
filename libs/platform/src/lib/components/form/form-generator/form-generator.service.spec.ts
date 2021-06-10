import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformSliderModule } from '../../slider/slider.module';

import { FormGeneratorService } from './form-generator.service';
import { DynamicFormItem } from './interfaces/dynamic-form-item';
import { BaseDynamicFormGeneratorControl, dynamicFormFieldProvider, dynamicFormGroupChildProvider } from './public_api';

export const dummyFormItems: DynamicFormItem[] = [
    {
        type: 'input',
        name: 'something',
        message: 'wow',
        default: 'test',
        transformer: (value: string) => {
            return `${value}!!!`;
        }
    }
];

export const brokenFormItems: DynamicFormItem[] = [
    {
        type: 'notExistingControlType',
        name: 'shouldNotBeInForm',
        message: 'wow',
        default: 'test'
    },
    {
        type: 'input',
        name: 'something',
        message: 'wow',
        default: 'test'
    }
];

@Component({
    template: `
        <ng-container [formGroup]="form">
           <fdp-slider [contentDensity]="formItem.guiOptions?.contentDensity"
                       [customValues]="formItem.choices"
                       [showTicks]="formItem.guiOptions?.additionalData?.showTicks"
                       [showTicksLabels]="formItem.guiOptions?.additionalData?.showTicksLabels"
                       [name]="name"
                       [formControlName]="name"></fdp-slider>
        </ng-container>
    `,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class TestCustomComponent extends BaseDynamicFormGeneratorControl {
    constructor() {
        super();
    }
}

describe('FormGeneratorService', () => {
    let service: FormGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestCustomComponent],
            imports: [FormsModule, ReactiveFormsModule, PlatformSliderModule]
        });
        service = TestBed.inject(FormGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create empty form', async () => {

        const form = await service.generateForm([]);

        expect(Object.keys(form.controls).length).toBe(0);
    });

    it('should create form with controls', async () => {

        const form = await service.generateForm(dummyFormItems);

        expect(form.controls.something).toBeTruthy();
    });

    it('should skip unknown form item type', async () => {
        const form = await service.generateForm(brokenFormItems);
        expect(form.controls['shouldNotBeInForm']).toBeUndefined();
    });

    it('Should return transformed form value', async () => {
        const form = await service.generateForm(dummyFormItems);
        form.controls.something.setValue('test');
        const formValue = await service.getFormValue(form);
        expect(formValue.something).toEqual('test!!!');
    });

    it('Should add custom component', async () => {
        expect(service.addComponent(TestCustomComponent, ['slider'])).toBeTruthy();
    });
});
