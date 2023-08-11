import { Component, ViewChild } from '@angular/core';
import {
    DynamicFormItem,
    DynamicFormValue,
    FormGeneratorComponent,
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider,
    BaseDynamicFormGeneratorControl,
    BaseDynamicFormFieldItem,
    FormGeneratorService,
    DynamicFormControlGroup
} from '@fundamental-ngx/platform/form';
import { dummyAwaitablePromise } from './platform-form-generator-example.component';

@Component({
    selector: 'fdp-platform-form-generator-show-new-items-example',
    templateUrl: './platform-form-generator-show-new-items-example.component.html'
})
export class PlatformFormGeneratorShowNewItemsExampleComponent {
    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    loading = false;

    formValue: DynamicFormValue;

    formItems: DynamicFormItem<{}, AddNewItemFormControl>[] = FORM_ITEMS;

    constructor(private readonly _formGeneratorService: FormGeneratorService) {
        this._formGeneratorService.addComponent(PlatformFormGeneratorCustomAddNewItemComponent, ['addNewItemButton']);
    }

    async onFormSubmitted(value: DynamicFormValue): Promise<void> {
        this.formValue = value;

        this.loading = true;

        // Simulate API request
        await dummyAwaitablePromise(5000);

        this.loading = false;
    }
}

export const FORM_ITEMS = [
    {
        type: 'input',
        name: 'firstName',
        message: 'First Name',
        rank: 0
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Last Name',
        rank: 1
    },
    {
        name: 'newItems',
        message: 'New Items',
        rank: 2,
        items: [
            {
                type: 'input',
                name: 'newProjectKey',
                message: 'New Project Key',
                rank: 3
            },
            {
                type: 'select',
                name: 'newIssueType',
                message: 'New Issue Type',
                choices: ['Option1', 'Option2'],
                rank: 4
            },
            {
                type: 'addNewItemButton',
                name: 'addMoreButton',
                message: '',
                rank: 5,
                shouldShow: false,
                default: false,
                when: (formValue: DynamicFormValue): boolean => formValue.newItems.addMoreButton === false
            },
            {
                type: 'input',
                name: 'newProjectKey2',
                message: 'New Project Key 2',
                shouldShow: false,
                rank: 6,
                when: (formValue: DynamicFormValue): boolean => formValue.newItems.addMoreButton === true
            },
            {
                type: 'select',
                name: 'newIssueType2',
                message: 'New Issue Type 2',
                choices: ['Option3', 'Option4'],
                shouldShow: false,
                rank: 7,
                when: (formValue: DynamicFormValue): boolean => formValue.newItems.addMoreButton === true
            }
        ]
    }
];

@Component({
    selector: 'fdp-form-generator-add-new',
    template: `
        <ng-container [formGroup]="form">
            <ng-container [formGroupName]="formGroupName">
                <fdp-button type="button" glyph="add" label="Add New Project" (click)="addNewItem()"></fdp-button>
            </ng-container>
        </ng-container>
    `,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class PlatformFormGeneratorCustomAddNewItemComponent extends BaseDynamicFormGeneratorControl {
    constructor(private readonly _formGeneratorService: FormGeneratorService) {
        super();
    }

    addNewItem(): void {
        (this.form.controls.newItems as DynamicFormControlGroup).controls.addMoreButton.setValue(true);
        if (FORM_ITEMS[2].items) {
            if (FORM_ITEMS[2].items[3]) {
                FORM_ITEMS[2].items[3].shouldShow = true;
            }
            if (FORM_ITEMS[2].items[4]) {
                FORM_ITEMS[2].items[4].shouldShow = true;
            }
        }
    }
}

export interface AddNewItemFormControl extends BaseDynamicFormFieldItem<{ value: boolean }> {
    type: 'addNewItemButton';
    value: boolean;
}
