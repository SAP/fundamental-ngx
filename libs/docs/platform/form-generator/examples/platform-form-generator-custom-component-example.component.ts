import { Component } from '@angular/core';

import {
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider,
    BaseDynamicFormGeneratorControl,
    FormGeneratorService,
    DynamicFormItem,
    DynamicFormValue,
    BaseDynamicFormFieldItem,
    DynamicFormItemChoice
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-form-generator-slider',
    template: `
        <ng-container [formGroup]="form">
            <ng-container [formGroupName]="formGroupName">
                <fdp-slider
                    [customValues]="formItem.choices || []"
                    [showTicks]="formItem.guiOptions?.additionalData?.showTicks"
                    [showTicksLabels]="formItem.guiOptions?.additionalData?.showTicksLabels"
                    [name]="name"
                    [formControlName]="name"
                ></fdp-slider>
            </ng-container>
        </ng-container>
    `,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class PlatformFormGeneratorCustomSliderElementComponent extends BaseDynamicFormGeneratorControl {
    constructor() {
        super();
    }
}

export interface SliderDynamicFormControl extends BaseDynamicFormFieldItem<{ value: number; label: string }> {
    type: 'slider';
    choices: DynamicFormItemChoice<number> | ((formValue?: DynamicFormValue) => DynamicFormItemChoice);
}

@Component({
    selector: 'fdp-platform-form-generator-custom-component-example',
    templateUrl: './platform-form-generator-custom-component-example.component.html'
})
export class PlatformFormGeneratorCustomComponentExampleComponent {
    formCreated = false;
    formValue: DynamicFormValue;

    questions: DynamicFormItem<{}, SliderDynamicFormControl>[] = [
        {
            type: 'slider',
            name: 'some_slider',
            message: 'Slider Component',
            default: { value: 30, label: 'Thirty' },
            choices: [
                { value: 10, label: 'Ten' },
                { value: 20, label: 'Twenty' },
                { value: 30, label: 'Thirty' },
                { value: 40, label: 'Forty' }
            ],
            guiOptions: {
                column: 1,
                additionalData: {
                    showTicks: true,
                    showTicksLabels: true
                }
            }
        }
    ];

    constructor(private readonly _formGeneratorService: FormGeneratorService) {
        this._formGeneratorService.addComponent(PlatformFormGeneratorCustomSliderElementComponent, ['slider']);
    }

    onFormCreated(): void {
        this.formCreated = true;
    }

    onFormSubmitted(value: DynamicFormValue): void {
        this.formValue = value;
    }
}
