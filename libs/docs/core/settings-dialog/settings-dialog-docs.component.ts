import { Component } from '@angular/core';
import { ContentDensityMode } from '@fundamental-ngx/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';

import { TemplateBasedSettingsDialogBylineExampleComponent } from './examples/template-based-settings-byline/template-based-settings-dialog-byline-example.component';
import { TemplateBasedSettingsDialogExampleComponent } from './examples/template-based-settings/template-based-settings-dialog-example.component';

const templateBasedSettingsDialogTs = 'template-based-settings/template-based-settings-dialog-example.component.ts';
const templateBasedSettingsDialogHtml = 'template-based-settings/template-based-settings-dialog-example.component.html';

const templateBasedSettingsDialogBylineTs =
    'template-based-settings-byline/template-based-settings-dialog-byline-example.component.ts';
const templateBasedSettingsDialogBylineHtml =
    'template-based-settings-byline/template-based-settings-dialog-byline-example.component.html';

@Component({
    selector: 'app-dialog',
    templateUrl: './settings-dialog-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TemplateBasedSettingsDialogExampleComponent,
        TemplateBasedSettingsDialogBylineExampleComponent,
        CodeExampleComponent,
        BarModule
    ]
})
export class SettingsDialogDocsComponent {
    schema: Schema;

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
            ariaDescribedBy: 'fd-dialog-body-11',
            contentDensity: ContentDensityMode.COZY
        }
    };

    templateSettingsDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(templateBasedSettingsDialogHtml),
            fileName: 'template-based-settings-dialog-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(templateBasedSettingsDialogTs),
            fileName: 'template-based-settings-dialog-example',
            component: 'TemplateBasedSettingsDialogExampleComponent'
        }
    ];

    templateSettingsDialogByline: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(templateBasedSettingsDialogBylineHtml),
            fileName: 'template-based-settings-dialog-byline-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(templateBasedSettingsDialogBylineTs),
            fileName: 'template-based-settings-dialog-byline-example',
            component: 'TemplateBasedSettingsDialogBylineExampleComponent'
        }
    ];

    constructor(
        private _schemaFactory: SchemaFactoryService,
        private _dialogService: DialogService
    ) {
        this.schema = this._schemaFactory.getComponent('dialog');
    }

    onSchemaValues(data): void {
        this.data = data;
    }

    openDialog(template): void {
        this._dialogService.open(template, this.data.properties);
    }
}
