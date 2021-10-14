import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlatformSliderModule } from '../../slider/slider.module';
import { FormGeneratorService } from './form-generator.service';
import { DynamicFormItem } from './interfaces/dynamic-form-item';
import { BaseDynamicFormGeneratorControl, dynamicFormFieldProvider, dynamicFormGroupChildProvider } from './public_api';

export const dummyFormItemsWithWhenCondition: DynamicFormItem[] = [
    {
        type: 'input',
        name: 'shouldBeVisible',
        message: 'Sould be visible',
        default: true
    },
    {
        type: 'input',
        name: 'shouldBeHidden',
        message: 'Should be hidden',
        when: (answers) => answers.shouldBeVisible === true
    }
];

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
            <fdp-slider
                [contentDensity]="formItem.guiOptions?.contentDensity"
                [customValues]="formItem.choices"
                [showTicks]="formItem.guiOptions?.additionalData?.showTicks"
                [showTicksLabels]="formItem.guiOptions?.additionalData?.showTicksLabels"
                [name]="name"
                [formControlName]="name"
            ></fdp-slider>
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
            imports: [FormsModule, ReactiveFormsModule, PlatformSliderModule],
            providers: [FormGeneratorService]
        });
        service = TestBed.inject(FormGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create empty form', async () => {
        const form = await service.generateForm('dummyForm', []);
        expect(Object.keys(form.controls).length).toBe(0);
    });

    it('should create form with controls', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItems);
        expect(form.controls.something).toBeTruthy();
    });

    it('should skip unknown form item type', async () => {
        const form = await service.generateForm('dummyForm', brokenFormItems);
        expect(form.controls['shouldNotBeInForm']).toBeUndefined();
    });

    it('should return transformed form value', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItems);
        form.controls.something.setValue('test');
        const formValue = await service.getFormValue(form);
        expect(formValue.something).toEqual('test!!!');
    });

    it('should add custom component', async () => {
        expect(service.addComponent(TestCustomComponent, ['slider'])).toBeTruthy();
    });

    it('should add custom component and return it by the type', async () => {
        service.addComponent(TestCustomComponent, ['slider']);

        expect(service.getComponentDefinitionByType('slider').component).toEqual(TestCustomComponent);
    });

    it('should check hide second field', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItemsWithWhenCondition);
        const visibleItems = await service.checkVisibleFormItems(form);
        expect(visibleItems.shouldBeHidden).toBeTruthy();
    });

    it('should check show second field', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItemsWithWhenCondition);
        form.controls.shouldBeVisible.setValue(false);
        const visibleItems = await service.checkVisibleFormItems(form);
        expect(visibleItems.shouldBeHidden).toBeFalsy();
    });
});
