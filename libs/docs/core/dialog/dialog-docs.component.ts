import { Component } from '@angular/core';

import { CdkScrollable } from '@angular/cdk/overlay';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule, DialogService, ExtendedDialogConfig } from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    PlayGroundComponent,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AutoLabelDialogExampleComponent } from './examples/auto-label/auto-label-dialog-example.component';
import { ComponentBasedDialogExampleComponent } from './examples/component-based/component-based-dialog-example.component';
import { DialogBackdropContainerExampleComponent } from './examples/dialog-backdrop-container/dialog-backdrop-container-example.component';
import { DialogComplexExampleComponent } from './examples/dialog-complex/dialog-complex-example.component';
import { DialogConfigurationExampleComponent } from './examples/dialog-configuration/dialog-configuration-example.component';
import { FormDialogExampleComponent } from './examples/dialog-form/form-dialog-example.component';
import { DialogFullScreenExampleComponent } from './examples/dialog-full-screen/dialog-full-screen-example.component';
import { DialogInnerPopoverComponent } from './examples/dialog-inner-popover/dialog-inner-popover.component';
import { DialogMobileExampleComponent } from './examples/dialog-mobile/dialog-mobile-example.component';
import { DialogObjectExampleComponent } from './examples/dialog-object-example/dialog-object-example.component';
import { DialogPositionExampleComponent } from './examples/dialog-position/dialog-position-example.component';
import { DialogStateExampleComponent } from './examples/dialog-state/dialog-state-example.component';
import { DialogStackedExampleComponent } from './examples/stacked-dialogs/dialog-stacked-example.component';
import { TemplateBasedDialogExampleComponent } from './examples/template-based/template-based-dialog-example.component';

const dialogExamplesScss = 'dialog-examples.component.scss';

const templateBasedDialogTs = 'template-based/template-based-dialog-example.component.ts';
const templateBasedDialogHtml = 'template-based/template-based-dialog-example.component.html';

const componentBasedDialogTs = 'component-based/component-based-dialog-example.component.ts';
const componentBasedDialogExampleTs = 'component-based/dialog-example.component.ts';

const customConfigurationDialogTs = 'dialog-configuration/dialog-configuration-example.component.ts';
const customConfigurationDialogHtml = 'dialog-configuration/dialog-configuration-example.component.html';

const stateDialogTs = 'dialog-state/dialog-state-example.component.ts';
const stateDialogHtml = 'dialog-state/dialog-state-example.component.html';

const positionHtml = 'dialog-position/dialog-position-example.component.html';
const positionTs = 'dialog-position/dialog-position-example.component.ts';

const dialogMobileHtml = 'dialog-mobile/dialog-mobile-example.component.html';
const dialogMobileTs = 'dialog-mobile/dialog-mobile-example.component.ts';

const dialogStackedTs = 'stacked-dialogs/dialog-stacked-example.component.ts';
const firstDialogStackedTs = 'stacked-dialogs/first-dialog-example.component.ts';
const secondDialogStackedTs = 'stacked-dialogs/second-dialog-example.component.ts';

const backdropContainerTs = 'dialog-backdrop-container/dialog-backdrop-container-example.component.ts';
const backdropContainerHtml = 'dialog-backdrop-container/dialog-backdrop-container-example.component.html';

const complexDialogTs = 'dialog-complex/dialog-complex-example.component.ts';
const complexDialogHtml = 'dialog-complex/dialog-complex-example.component.html';

const objectDialogTs = 'dialog-object-example/dialog-object-example.component.ts';
const objectDialogHtml = 'dialog-object-example/dialog-object-example.component.html';

const autoLabelTs = 'auto-label/auto-label-dialog-example.component.ts';
const autoLabelHtml = 'auto-label/auto-label-dialog-example.component.html';

const formDialogTs = 'dialog-form/form-dialog-example.component.ts';
const formDialogHtml = 'dialog-form/form-dialog-example.component.html';

const dialogFullScreenTs = 'dialog-full-screen/dialog-full-screen-example.component.ts';
const dialogFullScreenHtml = 'dialog-full-screen/dialog-full-screen-example.component.html';

const popoverDialogTs = 'dialog-inner-popover/dialog-inner-popover.component.ts';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TemplateBasedDialogExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        FormDialogExampleComponent,
        ComponentBasedDialogExampleComponent,
        DialogObjectExampleComponent,
        DialogStateExampleComponent,
        RouterLink,
        DialogConfigurationExampleComponent,
        AutoLabelDialogExampleComponent,
        DialogPositionExampleComponent,
        DialogMobileExampleComponent,
        DialogComplexExampleComponent,
        DialogStackedExampleComponent,
        DialogBackdropContainerExampleComponent,
        DialogInnerPopoverComponent,
        PlayGroundComponent,
        ButtonComponent,
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule,
        DialogFullScreenExampleComponent,
        AsyncPipe,
        JsonPipe,
        NgIf
    ]
})
export class DialogDocsComponent {
    schema: Schema;

    playgroundDialogConfig: ExtendedDialogConfig<{ allowFullScreen: boolean }>;

    data: any = {
        properties: {
            allowFullScreen: false,
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
            code: getAssetFromModuleAssets(templateBasedDialogHtml),
            fileName: 'template-based-dialog-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(templateBasedDialogTs),
            fileName: 'template-based-dialog-example',
            component: 'TemplateBasedDialogExampleComponent'
        }
    ];

    formDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formDialogHtml),
            fileName: 'form-dialog-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formDialogTs),
            fileName: 'form-dialog-example',
            component: 'FormDialogExampleComponent'
        }
    ];

    stateDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(stateDialogHtml),
            fileName: 'dialog-state-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(stateDialogTs),
            fileName: 'dialog-state-example',
            component: 'DialogStateExample'
        },
        {
            language: 'scss',
            code: dialogExamplesScss,
            fileName: 'dialog-state-example',
            component: 'DialogStateExample',
            scssFileCode: getAssetFromModuleAssets(dialogExamplesScss)
        }
    ];

    objectDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectDialogHtml),
            fileName: 'dialog-object-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(objectDialogTs),
            fileName: 'dialog-object-example',
            component: 'DialogObjectExampleComponent'
        }
    ];

    autoLabel: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(autoLabelHtml),
            fileName: 'dialog-object-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(autoLabelTs),
            fileName: 'auto-label-dialog-example',
            component: 'AutoLabelDialogExampleComponent'
        }
    ];

    componentAsContentSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(componentBasedDialogExampleTs),
            name: 'Dialog Content',
            fileName: 'dialog-example',
            component: 'DialogExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(componentBasedDialogTs),
            entryComponent: true,
            main: true,
            fileName: 'component-based-dialog-example',
            component: 'ComponentBasedDialogExampleComponent'
        }
    ];

    customConfiguration: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customConfigurationDialogHtml),
            fileName: 'dialog-configuration-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customConfigurationDialogTs),
            fileName: 'dialog-configuration-example',
            component: 'DialogConfigurationExample'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(dialogExamplesScss),
            fileName: 'dialog-configuration-example',
            component: 'DialogConfigurationExample',
            scssFileCode: getAssetFromModuleAssets(dialogExamplesScss)
        }
    ];

    stackedDialogs: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(secondDialogStackedTs),
            name: 'Second Dialog',
            fileName: 'second-dialog-example',
            component: 'SecondDialogExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(firstDialogStackedTs),
            name: 'First Dialog',
            fileName: 'first-dialog-example',
            component: 'FirstDialogExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dialogStackedTs),
            fileName: 'dialog-stacked-example',
            component: 'DialogStackedExampleComponent',
            main: true
        }
    ];

    dialogMobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dialogMobileHtml),
            fileName: 'dialog-mobile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dialogMobileTs),
            fileName: 'dialog-mobile-example',
            component: 'DialogMobileExampleComponent'
        }
    ];

    customBackdropContainer: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(backdropContainerHtml),
            fileName: 'dialog-backdrop-container-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(backdropContainerTs),
            fileName: 'dialog-backdrop-container-example',
            component: 'DialogBackdropContainerExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(dialogExamplesScss),
            fileName: 'dialog-backdrop-container-example',
            component: 'DialogBackdropContainerExample',
            scssFileCode: getAssetFromModuleAssets(dialogExamplesScss)
        }
    ];

    dialogPosition: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(positionHtml),
            fileName: 'dialog-position-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(positionTs),
            fileName: 'dialog-position-example',
            component: 'DialogPositionExampleComponent'
        }
    ];

    complexDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(complexDialogHtml),
            fileName: 'dialog-complex-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(complexDialogTs),
            fileName: 'dialog-complex-example',
            component: 'DialogComplexExampleComponent'
        }
    ];

    fullScreenDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dialogFullScreenHtml),
            fileName: 'dialog-full-screen-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dialogFullScreenTs),
            fileName: 'dialog-full-screen-example',
            component: 'DialogFullScreenExampleComponent'
        }
    ];

    dialogInnerPopover: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(popoverDialogTs),
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
