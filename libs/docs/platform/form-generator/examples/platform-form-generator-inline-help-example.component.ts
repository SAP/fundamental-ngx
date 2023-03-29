import { AfterViewInit, Component, inject, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { DynamicFormItem } from '@fundamental-ngx/platform/form';
import { HintOptions } from '@fundamental-ngx/platform/shared';
import { first } from 'rxjs';

@Component({
    selector: 'fdp-platform-form-generator-inline-help-example',
    templateUrl: './platform-form-generator-inline-help-example.component.html'
})
export class PlatformFormGeneratorInlineHelpExampleComponent implements AfterViewInit {
    @ViewChild('hintTemplate', { static: true })
    hintTemplate!: TemplateRef<void>;

    ngZone = inject(NgZone);

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
                    content: 'Some hint for name',
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
                    content: 'Some hint for last name',
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
                            content: 'Some hint for name',
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
                            content: 'Some hint for last name',
                            target: 'label'
                        }
                    }
                }
            ]
        }
    ];

    formItemsWithTemplateHint: DynamicFormItem[];

    formGeneratorMainHint: HintOptions = {
        content: 'Some hint for main title'
    };

    ngAfterViewInit(): void {
        this.ngZone.onStable.pipe(first()).subscribe(() => {
            this.formItemsWithTemplateHint = [
                {
                    name: 'firstAndLastName',
                    message: 'First And Last Name',
                    items: [
                        {
                            type: 'input',
                            id: 'firstName-for-template-hint-example',
                            name: 'firstName',
                            message: 'First Name',
                            guiOptions: {
                                hint: this.hintTemplate
                            }
                        }
                    ]
                }
            ];
        });
    }
}
