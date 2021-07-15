import { Component } from '@angular/core';

import * as templateBasedDialogTs from '!raw-loader!./examples/template-based/template-based-dialog-example.component.ts';
import * as templateBasedDialogHtml from '!raw-loader!./examples/template-based/template-based-dialog-example.component.html';

import * as componentBasedDialogTs from '!raw-loader!./examples/component-based/component-based-dialog-example.component.ts';
import * as componentBasedDialogExampleTs from '!raw-loader!./examples/component-based/dialog-example.component.ts';

import * as customConfigurationDialogTs from '!raw-loader!./examples/dialog-configuration/dialog-configuration-example.component.ts';
import * as customConfigurationDialogHtml from '!raw-loader!./examples/dialog-configuration/dialog-configuration-example.component.html';

import * as stateDialogTs from '!raw-loader!./examples/dialog-state/dialog-state-example.component.ts';
import * as stateDialogHtml from '!raw-loader!./examples/dialog-state/dialog-state-example.component.html';

import * as positionHtml from '!raw-loader!./examples/dialog-position/dialog-position-example.component.html';
import * as positionTs from '!raw-loader!./examples/dialog-position/dialog-position-example.component.ts';

import * as dialogMobileHtml from '!raw-loader!./examples/dialog-mobile/dialog-mobile-example.component.html';
import * as dialogMobileTs from '!raw-loader!./examples/dialog-mobile/dialog-mobile-example.component.ts';

import * as dialogStackedTs from '!raw-loader!./examples/stacked-dialogs/dialog-stacked-example.component.ts';
import * as firstDialogStackedTs from '!raw-loader!./examples/stacked-dialogs/first-dialog-example.component.ts';
import * as secondDialogStackedTs from '!raw-loader!./examples/stacked-dialogs/second-dialog-example.component.ts';

import * as backdropContainerTs from '!raw-loader!./examples/dialog-backdrop-container/dialog-backdrop-container-example.component.ts';
import * as backdropContainerHtml from '!raw-loader!./examples/dialog-backdrop-container/dialog-backdrop-container-example.component.html';

import * as complexDialogTs from '!raw-loader!./examples/dialog-complex/dialog-complex-example.component.ts';
import * as complexDialogHtml from '!raw-loader!./examples/dialog-complex/dialog-complex-example.component.html';

import * as objectDialogTs from '!raw-loader!./examples/dialog-object-example/dialog-object-example.component.ts';
import * as objectDialogHtml from '!raw-loader!./examples/dialog-object-example/dialog-object-example.component.html';

import { DialogService } from '@fundamental-ngx/core/dialog';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { Schema } from '../../../schema/models/schema.model';

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
            maxWidth: ''
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
