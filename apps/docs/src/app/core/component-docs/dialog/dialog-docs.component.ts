import { Component } from '@angular/core';

import templateBasedDialogTs from '!./examples/template-based/template-based-dialog-example.component.ts?raw';
import templateBasedDialogHtml from '!./examples/template-based/template-based-dialog-example.component.html?raw';

import componentBasedDialogTs from '!./examples/component-based/component-based-dialog-example.component.ts?raw';
import componentBasedDialogExampleTs from '!./examples/component-based/dialog-example.component.ts?raw';

import customConfigurationDialogTs from '!./examples/dialog-configuration/dialog-configuration-example.component.ts?raw';
import customConfigurationDialogHtml from '!./examples/dialog-configuration/dialog-configuration-example.component.html?raw';

import stateDialogTs from '!./examples/dialog-state/dialog-state-example.component.ts?raw';
import stateDialogHtml from '!./examples/dialog-state/dialog-state-example.component.html?raw';

import positionHtml from '!./examples/dialog-position/dialog-position-example.component.html?raw';
import positionTs from '!./examples/dialog-position/dialog-position-example.component.ts?raw';

import dialogMobileHtml from '!./examples/dialog-mobile/dialog-mobile-example.component.html?raw';
import dialogMobileTs from '!./examples/dialog-mobile/dialog-mobile-example.component.ts?raw';

import dialogStackedTs from '!./examples/stacked-dialogs/dialog-stacked-example.component.ts?raw';
import firstDialogStackedTs from '!./examples/stacked-dialogs/first-dialog-example.component.ts?raw';
import secondDialogStackedTs from '!./examples/stacked-dialogs/second-dialog-example.component.ts?raw';

import backdropContainerTs from '!./examples/dialog-backdrop-container/dialog-backdrop-container-example.component.ts?raw';
import backdropContainerHtml from '!./examples/dialog-backdrop-container/dialog-backdrop-container-example.component.html?raw';

import complexDialogTs from '!./examples/dialog-complex/dialog-complex-example.component.ts?raw';
import complexDialogHtml from '!./examples/dialog-complex/dialog-complex-example.component.html?raw';

import objectDialogTs from '!./examples/dialog-object-example/dialog-object-example.component.ts?raw';
import objectDialogHtml from '!./examples/dialog-object-example/dialog-object-example.component.html?raw';

import autoLabelTs from '!./examples/auto-label/auto-label-dialog-example.component.ts?raw';
import autoLabelHtml from '!./examples/auto-label/auto-label-dialog-example.component.html?raw';

import formDialogTs from '!./examples/dialog-form/form-dialog-example.component.ts?raw';
import formDialogHtml from '!./examples/dialog-form/form-dialog-example.component.html?raw';

import popoverDialogTs from '!./examples/dialog-inner-popover/dialog-inner-popover.component.ts?raw';

import { DialogService } from '@fundamental-ngx/core/dialog';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { Schema } from '../../../schema/models/schema.model';

import dialogExamplesScss from '!./examples/dialog-examples.component.scss?raw';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog-docs.component.html'
})
export class DialogDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    hasBackdrop: {
                        type: 'boolean'
                    },
                    backdropClickCloseable: {
                        type: 'boolean'
                    },
                    escKeyCloseable: {
                        type: 'boolean'
                    },
                    focusTrapped: {
                        type: 'boolean'
                    },
                    fullScreen: {
                        type: 'boolean'
                    },
                    mobile: {
                        type: 'boolean'
                    },
                    mobileOuterSpacing: {
                        type: 'boolean'
                    },
                    draggable: {
                        type: 'boolean'
                    },
                    resizable: {
                        type: 'boolean'
                    },
                    verticalPadding: {
                        type: 'boolean'
                    },
                    responsivePadding: {
                        type: 'boolean'
                    },
                    width: {
                        type: 'string'
                    },
                    height: {
                        type: 'string'
                    },
                    minHeight: {
                        type: 'string'
                    },
                    maxHeight: {
                        type: 'string'
                    },
                    minWidth: {
                        type: 'string'
                    },
                    maxWidth: {
                        type: 'string'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            hasBackdrop: true,
            backdropClickCloseable: true,
            escKeyCloseable: true,
            focusTrapped: true,
            fullScreen: false,
            mobile: false,
            mobileOuterSpacing: false,
            draggable: false,
            resizable: false,
            verticalPadding: true,
            responsivePadding: true,
            width: '',
            height: '',
            minHeight: '',
            maxHeight: '',
            minWidth: '',
            maxWidth: '',
            ariaLabelledBy: 'fd-dialog-header-11',
            ariaDescribedBy: 'fd-dialog-body-11'
        }
    };

    templateDialog: ExampleFile[] = [
        {
            language: 'html',
            code: templateBasedDialogHtml,
            fileName: 'template-based-dialog-example'
        },
        {
            language: 'typescript',
            code: templateBasedDialogTs,
            fileName: 'template-based-dialog-example',
            component: 'TemplateBasedDialogExampleComponent'
        }
    ];

    formDialog: ExampleFile[] = [
        {
            language: 'html',
            code: formDialogHtml,
            fileName: 'form-dialog-example'
        },
        {
            language: 'typescript',
            code: formDialogTs,
            fileName: 'form-dialog-example',
            component: 'FormDialogExampleComponent'
        }
    ];

    stateDialog: ExampleFile[] = [
        {
            language: 'html',
            code: stateDialogHtml,
            fileName: 'dialog-state-example'
        },
        {
            language: 'typescript',
            code: stateDialogTs,
            fileName: 'dialog-state-example',
            component: 'DialogStateExample'
        },
        {
            language: 'scss',
            code: dialogExamplesScss,
            fileName: 'dialog-state-example',
            component: 'DialogStateExample',
            scssFileCode: dialogExamplesScss
        }
    ];

    objectDialog: ExampleFile[] = [
        {
            language: 'html',
            code: objectDialogHtml,
            fileName: 'dialog-object-example'
        },
        {
            language: 'typescript',
            code: objectDialogTs,
            fileName: 'dialog-object-example',
            component: 'DialogObjectExampleComponent'
        }
    ];

    autoLabel: ExampleFile[] = [
        {
            language: 'html',
            code: autoLabelHtml,
            fileName: 'dialog-object-example'
        },
        {
            language: 'typescript',
            code: autoLabelTs,
            fileName: 'auto-label-dialog-example',
            component: 'AutoLabelDialogExampleComponent'
        }
    ];

    componentAsContentSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: componentBasedDialogExampleTs,
            name: 'Dialog Content',
            fileName: 'dialog-example',
            component: 'DialogExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: componentBasedDialogTs,
            entryComponent: true,
            main: true,
            fileName: 'component-based-dialog-example',
            component: 'ComponentBasedDialogExampleComponent'
        }
    ];

    customConfiguration: ExampleFile[] = [
        {
            language: 'html',
            code: customConfigurationDialogHtml,
            fileName: 'dialog-configuration-example'
        },
        {
            language: 'typescript',
            code: customConfigurationDialogTs,
            fileName: 'dialog-configuration-example',
            component: 'DialogConfigurationExample'
        },
        {
            language: 'scss',
            code: dialogExamplesScss,
            fileName: 'dialog-configuration-example',
            component: 'DialogConfigurationExample',
            scssFileCode: dialogExamplesScss
        }
    ];

    stackedDialogs: ExampleFile[] = [
        {
            language: 'typescript',
            code: secondDialogStackedTs,
            name: 'Second Dialog',
            fileName: 'second-dialog-example',
            component: 'SecondDialogExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: firstDialogStackedTs,
            name: 'First Dialog',
            fileName: 'first-dialog-example',
            component: 'FirstDialogExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: dialogStackedTs,
            fileName: 'dialog-stacked-example',
            component: 'DialogStackedExampleComponent',
            main: true
        }
    ];

    dialogMobile: ExampleFile[] = [
        {
            language: 'html',
            code: dialogMobileHtml,
            fileName: 'dialog-mobile-example'
        },
        {
            language: 'typescript',
            code: dialogMobileTs,
            fileName: 'dialog-mobile-example',
            component: 'DialogMobileExampleComponent'
        }
    ];

    customBackdropContainer: ExampleFile[] = [
        {
            language: 'html',
            code: backdropContainerHtml,
            fileName: 'dialog-backdrop-container-example'
        },
        {
            language: 'typescript',
            code: backdropContainerTs,
            fileName: 'dialog-backdrop-container-example',
            component: 'DialogBackdropContainerExampleComponent'
        },
        {
            language: 'scss',
            code: dialogExamplesScss,
            fileName: 'dialog-backdrop-container-example',
            component: 'DialogBackdropContainerExample',
            scssFileCode: dialogExamplesScss
        }
    ];

    dialogPosition: ExampleFile[] = [
        {
            language: 'html',
            code: positionHtml,
            fileName: 'dialog-position-example'
        },
        {
            language: 'typescript',
            code: positionTs,
            fileName: 'dialog-position-example',
            component: 'DialogPositionExampleComponent'
        }
    ];

    complexDialog: ExampleFile[] = [
        {
            language: 'html',
            code: complexDialogHtml,
            fileName: 'dialog-complex-example'
        },
        {
            language: 'typescript',
            code: complexDialogTs,
            fileName: 'dialog-complex-example',
            component: 'DialogComplexExampleComponent'
        }
    ];

    dialogInnerPopover: ExampleFile[] = [
        {
            language: 'typescript',
            code: popoverDialogTs,
            fileName: 'dialog-inner-popover',
            component: 'DialogInnerPopoverComponent'
        }
    ];

    constructor(private _schemaFactory: SchemaFactoryService, private _dialogService: DialogService) {
        this.schema = this._schemaFactory.getComponent('dialog');
    }

    onSchemaValues(data): void {
        this.data = data;
    }

    openDialog(template): void {
        this._dialogService.open(template, this.data.properties);
    }
}
