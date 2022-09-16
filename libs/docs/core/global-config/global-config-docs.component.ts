import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const dialogGlobalConfigSrc = 'dialog-global-config-example/dialog-global-config-example.module.ts';
const messageBoxGlobalConfigSrc = 'message-box-global-config-example/message-box-global-config-example.module.ts';
const stepInputConfigurationSrc = 'mobile-mode-global-config-example/mobile-mode-global-config-example.module.ts';
const popoverMobileGlobalConfigExampleSrc =
    'popover-mobile-global-config-example/popover-mobile-global-config-example.module.ts';

@Component({
    selector: 'app-global-config-docs',
    templateUrl: './global-config-docs.component.html'
})
export class GlobalConfigDocsComponent {
    dialogGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: getAssetFromModuleAssets(dialogGlobalConfigSrc)
    };

    messageBoxGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: getAssetFromModuleAssets(messageBoxGlobalConfigSrc)
    };

    mobileGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: getAssetFromModuleAssets(stepInputConfigurationSrc)
    };

    popoverMobileGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: getAssetFromModuleAssets(popoverMobileGlobalConfigExampleSrc)
    };
}
