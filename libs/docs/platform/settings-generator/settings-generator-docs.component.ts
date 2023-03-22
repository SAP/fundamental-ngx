import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-settings-generator',
    templateUrl: './settings-generator-docs.component.html'
})
export class SettingsGeneratorDocsComponent {
    defaultConfigExample = getAssetFromModuleAssets('default/default-config.ts');
    settingsGeneratorDefaultExample: ExampleFile[] = [
        getExampleFile('default/settings-generator-default-example.component.html'),
        getExampleFile('default/settings-generator-default-example.component.ts')
    ];

    settingsGeneratorCustomControlExample: ExampleFile[] = [
        getExampleFile('custom-control/settings-generator-custom-control-example.component.html'),
        getExampleFile('custom-control/settings-generator-custom-control-example.component.ts')
    ];

    settingsGeneratorCustomLayoutExample: ExampleFile[] = [
        getExampleFile('custom-layout/settings-generator-custom-layout-example.component.html'),
        getExampleFile('custom-layout/settings-generator-custom-layout-example.component.ts')
    ];

    settingsGeneratorDialogLayoutExample: ExampleFile[] = [
        getExampleFile('dialog/settings-generator-dialog-example.component.html'),
        getExampleFile('dialog/settings-generator-dialog-example.component.ts')
    ];

    settingsGeneratorMessagePopoverLayoutExample: ExampleFile[] = [
        getExampleFile('message-popover/settings-generator-message-popover-example.component.html'),
        getExampleFile('message-popover/settings-generator-message-popover-example.component.ts')
    ];
}
