import { Component } from '@angular/core';
import * as splitMenuButtonTypesHtml from '!raw-loader!./platform-split-menu-button-examples/platform-split-button-types-example.component.html';
import * as splitMenuButtonTypesCode from '!raw-loader!./platform-split-menu-button-examples/platform-split-button-types-example.component.ts';
import * as splitMenuButtonIconsHtml from '!raw-loader!./platform-split-menu-button-examples/platform-split-button-icons-example.component.html';
import * as splitMenuButtonIconsCode from '!raw-loader!./platform-split-menu-button-examples/platform-split-button-icons-example.component.ts';
import * as splitMenuButtonBehaviorHtml from '!raw-loader!./platform-split-menu-button-examples/platform-split-button-behaviors-example.component.html';
import * as splitMenuButtonBehaviorCode from '!raw-loader!./platform-split-menu-button-examples/platform-split-button-behaviors-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-split-menu-button',
    templateUrl: './platform-split-menu-button.component.html'
})
export class PlatformDocsSplitMenuButtonComponent {
    splitMenuButtonBehavior: ExampleFile[] = [
        {
            language: 'html',
            code: splitMenuButtonBehaviorHtml,
            fileName: 'platform-split-button-behaviors-example'
        },
        {
            language: 'typescript',
            code: splitMenuButtonBehaviorCode,
            fileName: 'platform-split-button-behaviors-example',
            component: 'PlatformDocsSplitMenuButtonBehaviorComponent'
        }
    ];

    splitMenuButtonTypes: ExampleFile[] = [
        {
            language: 'html',
            code: splitMenuButtonTypesHtml,
            fileName: 'platform-split-button-types-example'
        },
        {
            language: 'typescript',
            code: splitMenuButtonTypesCode,
            fileName: 'platform-split-button-types-example',
            component: 'PlatformDocsSplitMenuButtonTypesComponent'
        }
    ];

    splitMenuButtonIcons: ExampleFile[] = [
        {
            language: 'html',
            code: splitMenuButtonIconsHtml,
            fileName: 'platform-split-button-icons-example'
        },
        {
            language: 'typescript',
            code: splitMenuButtonIconsCode,
            fileName: 'platform-split-button-icons-example',
            component: 'PlatformDocsSplitMenuButtonIconsComponent'
        }
    ];
}
