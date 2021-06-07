import { Component, OnInit } from '@angular/core';
import { FormGeneratorService, DynamicFormItem } from '@fundamental-ngx/platform';
import {
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider,
    BaseDynamicFormGeneratorControl
} from '@fundamental-ngx/platform';
import { FormGroup } from '@angular/forms';

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
export class PlatformFormGeneratorCustomSliderElement extends BaseDynamicFormGeneratorControl implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {
    }
}

@Component({
  selector: 'fdp-platform-form-generator-custom-component-example',
  templateUrl: './platform-form-generator-custom-component-example.component.html'
})
export class PlatformFormGeneratorCustomComponentExampleComponent implements OnInit {

    formCreated = false;
    formValue: { [key: string]: any };

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
        private _formGeneratorService: FormGeneratorService
    ) {
        this._formGeneratorService.addComponent(PlatformFormGeneratorCustomSliderElement, 'slider');
    }

    ngOnInit(): void {
    }

    onFormCreated(form: FormGroup): void {
        this.formCreated = true;
    }

    onFormSubmitted(value: { [key: string]: any }): void {
        this.formValue = value;
    }
}
