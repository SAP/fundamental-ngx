import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { SettingsGeneratorCustomControlExampleComponent } from './examples/custom-control/settings-generator-custom-control-example.component';
import { SettingsGeneratorCustomLayoutExampleComponent } from './examples/custom-layout/settings-generator-custom-layout-example.component';
import { SettingsGeneratorDefaultExampleComponent } from './examples/default/settings-generator-default-example.component';
import { SettingsGeneratorDialogExampleComponent } from './examples/dialog/settings-generator-dialog-example.component';
import { SettingsGeneratorMessagePopoverExampleComponent } from './examples/message-popover/settings-generator-message-popover-example.component';

@Component({
    selector: 'app-settings-generator',
    templateUrl: './settings-generator-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        RouterLink,
        ComponentExampleComponent,
        SettingsGeneratorDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        SettingsGeneratorMessagePopoverExampleComponent,
        SettingsGeneratorCustomLayoutExampleComponent,
        SettingsGeneratorCustomControlExampleComponent,
        SettingsGeneratorDialogExampleComponent,
        CodeSnippetComponent,
        AsyncPipe
    ]
})
export class SettingsGeneratorDocsComponent {
    defaultConfigExample = getAssetFromModuleAssets('default/default-config.ts');
    settingsGeneratorDefaultExample: ExampleFile[] = [
        getExampleFile('default/settings-generator-default-example.component.html'),
        getExampleFile('default/settings-generator-default-example.component.ts', {
            selector: 'settings-generator-default-example',
            component: 'SettingsGeneratorDefaultExampleComponent'
        })
    ];

    settingsGeneratorCustomControlExample: ExampleFile[] = [
        getExampleFile('custom-control/settings-generator-custom-control-example.component.html'),
        getExampleFile('custom-control/settings-generator-custom-control-example.component.ts', {
            selector: 'settings-generator-custom-control-example',
            component: 'SettingsGeneratorCustomControlExampleComponent'
        })
    ];

    settingsGeneratorCustomLayoutExample: ExampleFile[] = [
        getExampleFile('custom-layout/settings-generator-custom-layout-example.component.html'),
        getExampleFile('custom-layout/settings-generator-custom-layout-example.component.ts', {
            selector: 'settings-generator-custom-layout-example',
            component: 'SettingsGeneratorCustomLayoutExampleComponent'
        })
    ];

    settingsGeneratorDialogLayoutExample: ExampleFile[] = [
        getExampleFile('dialog/settings-generator-dialog-example.component.html'),
        getExampleFile('dialog/settings-generator-dialog-example.component.ts', {
            selector: 'settings-generator-dialog-example',
            component: 'SettingsGeneratorDialogExampleComponent'
        })
    ];

    settingsGeneratorMessagePopoverLayoutExample: ExampleFile[] = [
        getExampleFile('message-popover/settings-generator-message-popover-example.component.html'),
        getExampleFile('message-popover/settings-generator-message-popover-example.component.ts', {
            selector: 'settings-generator-message-popover-example',
            component: 'SettingsGeneratorMessagePopoverExampleComponent'
        })
    ];
}
