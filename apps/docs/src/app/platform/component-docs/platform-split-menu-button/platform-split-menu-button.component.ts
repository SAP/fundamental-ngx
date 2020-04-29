import { Component } from '@angular/core';
import * as splitMenuButtonExampleHtml from '!raw-loader!./platform-split-menu-button-examples/platform-split-menu-button-examples.component.html';
import * as splitMenuButtonExampleCode from '!raw-loader!./platform-split-menu-button-examples/platform-split-menu-button-examples.component.ts';
import * as splitMenuButtonOptionsHtml from '!raw-loader!./platform-split-menu-button-examples/platform-split-menu-button-options.component.html';
import * as splitMenuButtonOptionsCode from '!raw-loader!./platform-split-menu-button-examples/platform-split-menu-button-options.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-split-menu-button',
    templateUrl: './platform-split-menu-button.component.html',
})
export class PlatformDocsSplitMenuButtonComponent {
    splitMenuButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: splitMenuButtonExampleHtml,
            fileName: 'platform-split-menu-button-example',
        },
        {
            language: 'typescript',
            code: splitMenuButtonExampleCode,
            fileName: 'platform-split-menu-button-example',
            component: 'PlatformSplitMenuButtonExampleComponent',
        },
    ];

    splitMenuButtonOptions: ExampleFile[] = [
        {
            language: 'html',
            code: splitMenuButtonOptionsHtml,
            fileName: 'platform-split-menu-button-options',
        },
        {
            language: 'typescript',
            code: splitMenuButtonOptionsCode,
            fileName: 'platform-split-menu-button-options',
            component: 'PlatformSplitMenuButtonExampleComponent',
        },
    ];
}
