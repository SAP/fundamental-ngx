import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';
import { FormGeneratorComponentsAccessorService } from './form-generator-components-accessor.service';
import { FormGeneratorService } from './form-generator.service';
import { DynamicFormItemMap } from './interfaces/dynamic-form-item';
import {
    defaultFormGeneratorItemConfigProvider,
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider
} from './providers/providers';
import { BaseDynamicFormGeneratorControl } from './base-dynamic-form-generator-control';
import { mapFormItems } from './helpers';
import { PlatformFormGeneratorModule } from './fdp-form-generator.module';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

export const dummyFormItemsWithWhenCondition: Map<string, DynamicFormItemMap> = mapFormItems([
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
]);

export const dummyFormItems: Map<string, DynamicFormItemMap> = mapFormItems([
    {
        type: 'input',
        name: 'something',
        message: 'wow',
        default: 'test',
        transformer: (value: string) => `${value}!!!`
    }
]);

export const brokenFormItems: Map<string, DynamicFormItemMap> = mapFormItems([
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
]);

@Component({
    template: `
        <ng-container [formGroup]="form">
            <fdp-slider
                [fdContentDensity]="$any(formItem.guiOptions?.contentDensity)"
                [customValues]="$any(formItem.choices)"
                [showTicks]="formItem.guiOptions?.additionalData?.showTicks"
                [showTicksLabels]="formItem.guiOptions?.additionalData?.showTicksLabels"
                [name]="name"
                [formControlName]="name"
            ></fdp-slider>
        </ng-container>
    `,
    standalone: true,
    imports: [PlatformFormGeneratorModule, PlatformSliderModule, ReactiveFormsModule, ContentDensityModule],
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
            imports: [FormsModule, ReactiveFormsModule, TestCustomComponent],
            providers: [
                defaultFormGeneratorItemConfigProvider,
                FormGeneratorService,
                FormGeneratorComponentsAccessorService
            ]
        });
        service = TestBed.inject(FormGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create empty form', async () => {
        const form = await service.generateForm('dummyForm', new Map());
        // There's always a default group called 'ungrouped'.
        expect(Object.keys(form.controls).length).toBe(1);
    });

    it('should create form with controls', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItems);

        const control = service.getFormControl(form, 'something');

        expect(control).toBeTruthy();
    });

    it('should skip unknown form item type', async () => {
        const form = await service.generateForm('dummyForm', brokenFormItems);

        const nonExistingControl = service.getFormControl(form, 'shouldNotBeInForm');

        expect(nonExistingControl).toBeNull();
    });

    it('should return transformed form value', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItems);

        const control = service.getFormControl(form, 'something');

        control.setValue('test');
        const formValue = await service.getFormValue(form);
        expect(formValue.something).toEqual('test!!!');
    });

    it('should add custom component', async () => {
        expect(service.addComponent(TestCustomComponent, ['slider'])).toBeTruthy();
    });

    it('should add custom component and return it by the type', async () => {
        service.addComponent(TestCustomComponent, ['slider']);

        expect(service.getComponentDefinitionByType('slider')?.component).toEqual(TestCustomComponent);
    });

    it('should check hide second field', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItemsWithWhenCondition);
        const visibleItems = await service.checkVisibleFormItems(form);
        expect(visibleItems.shouldBeHidden).toBeTruthy();
    });

    it('should check show second field', async () => {
        const form = await service.generateForm('dummyForm', dummyFormItemsWithWhenCondition);

        const visibleControl = service.getFormControl(form, 'shouldBeVisible');

        visibleControl.setValue(false);
        const visibleItems = await service.checkVisibleFormItems(form);
        expect(visibleItems.shouldBeHidden).toBeFalsy();
    });
});
