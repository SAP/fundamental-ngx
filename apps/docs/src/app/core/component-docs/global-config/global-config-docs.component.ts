import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import dialogGlobalConfigSrc from '!./examples/dialog-global-config-example/dialog-global-config-example.module.ts?raw';
import messageBoxGlobalConfigSrc from '!./examples/message-box-global-config-example/message-box-global-config-example.module.ts?raw';
import stepInputConfigurationSrc from '!./examples/mobile-mode-global-config-example/mobile-mode-global-config-example.module.ts?raw';
import popoverMobileGlobalConfigExampleSrc from '!./examples/popover-mobile-global-config-example/popover-mobile-global-config-example.module.ts?raw';

@Component({
    selector: 'app-global-config-docs',
    templateUrl: './global-config-docs.component.html'
})
export class GlobalConfigDocsComponent {
    dialogGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: dialogGlobalConfigSrc
    };

    messageBoxGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: messageBoxGlobalConfigSrc
    };

    mobileGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: stepInputConfigurationSrc
    };

    popoverMobileGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: popoverMobileGlobalConfigExampleSrc
    };
}
