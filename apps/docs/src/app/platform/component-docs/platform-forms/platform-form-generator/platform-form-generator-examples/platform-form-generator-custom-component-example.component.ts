import { Component } from '@angular/core';

import {
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider,
    BaseDynamicFormGeneratorControl,
    FormGeneratorService,
    DynamicFormItem,
    DynamicFormValue
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-form-generator-slider',
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
export class PlatformFormGeneratorCustomSliderElement extends BaseDynamicFormGeneratorControl {
    constructor() {
        super();
    }
}

@Component({
    selector: 'fdp-platform-form-generator-custom-component-example',
    templateUrl: './platform-form-generator-custom-component-example.component.html'
})
export class PlatformFormGeneratorCustomComponentExampleComponent {

    formCreated = false;
    formValue: DynamicFormValue;

    questions: DynamicFormItem[] = [
        {
            type: 'slider',
            name: 'some_slider',
            message: 'Slider component',
            default: {value: 30, label: 'Thirty'},
            choices: [
                {value: 10, label: 'Ten'},
                {value: 20, label: 'Twenty'},
                {value: 30, label: 'Thirty'},
                {value: 40, label: 'Forty'},
            ],
            guiOptions: {
                column: 1,
                additionalData: {
                    showTicks: true,
                    showTicksLabels: true
                }
            }
        }
    ]

    constructor(
        private readonly _formGeneratorService: FormGeneratorService
    ) {
        this._formGeneratorService.addComponent(PlatformFormGeneratorCustomSliderElement, ['slider']);
    }

    onFormCreated(): void {
        this.formCreated = true;
    }

    onFormSubmitted(value: DynamicFormValue): void {
        this.formValue = value;
    }
}
