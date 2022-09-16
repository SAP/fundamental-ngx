import { Component } from '@angular/core';
import { DynamicFormItem } from '@fundamental-ngx/platform/form';
import { HintOptions } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-form-generator-inline-help-example',
    templateUrl: './platform-form-generator-inline-help-example.component.html'
})
export class PlatformFormGeneratorInlineHelpExampleComponent {
    formItemsAutoHintPlacement: DynamicFormItem[] = [
        {
            type: 'input',
            name: 'firstName',
            message: 'First Name',
            guiOptions: {
                hint: 'Some hint for name'
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Last Name',
            guiOptions: {
                hint: 'Some hint for last name'
            }
        }
    ];
    formItemsLabelHintPlacement: DynamicFormItem[] = [
        {
            type: 'input',
            name: 'firstName',
            message: 'First Name',
            guiOptions: {
                hint: {
                    text: 'Some hint for name',
                    target: 'label'
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Last Name',
            guiOptions: {
                hint: {
                    text: 'Some hint for last name',
                    target: 'label'
                }
            }
        }
    ];
    formItemsHintOnGroupHeader: DynamicFormItem[] = [
        {
            name: 'firstAndLastName',
            message: 'First And Last Name',
            guiOptions: {
                hint: 'Some contextual hint on group header'
            },
            items: [
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'First Name',
                    guiOptions: {
                        hint: {
                            text: 'Some hint for name',
                            target: 'label'
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Last Name',
                    guiOptions: {
                        hint: {
                            text: 'Some hint for last name',
                            target: 'label'
                        }
                    }
                }
            ]
        }
    ];

    formGeneratorMainHint: HintOptions = {
        text: 'Some hint for main title'
    };
}
