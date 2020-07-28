import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as dialogGlobalConfigSrc from '!raw-loader!./examples/dialog-global-config-example/dialog-global-config-example.module.ts';
import * as stepInputConfigurationSrc from '!raw-loader!./examples/mobile-mode-global-config-example/mobile-mode-global-config-example.module.ts';

@Component({
    selector: 'app-global-config-docs',
    templateUrl: './global-config-docs.component.html'
})
export class GlobalConfigDocsComponent {
    dialogGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: dialogGlobalConfigSrc
    };

    mobileGlobalConfigExample: ExampleFile = {
        language: 'typescript',
        code: stepInputConfigurationSrc
    };
}
