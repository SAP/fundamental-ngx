import { Component } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/menu-example.component.html';
import * as menuAddon from '!raw-loader!./examples/menu-addon-example.component.html';
import * as menuAddonTsCode from '!raw-loader!./examples/menu-addon-examples.component.ts';
import * as menuGroupSrc from '!raw-loader!./examples/menu-group-example.component.html';
import * as menuKeyboardSrcH from '!raw-loader!./examples/menu-keyboard-support-example.component.html';
import * as menuKeyboardSrcT from '!raw-loader!./examples/menu-keyboard-support-example.component.ts';
import * as menuSeparatorSrc from '!raw-loader!./examples/menu-separator-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: menuSrc,
            fileName: 'menu-example',
        }
    ];
    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: menuAddon,
            fileName: 'menu-addon-example',
            typescriptFileCode: menuAddonTsCode,
            component: 'MenuExampleComponent'
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: menuGroupSrc,
            fileName: 'menu-group-example',
        }
    ];

    menuKeyboard: ExampleFile[] = [
        {
            language: 'html',
            code: menuKeyboardSrcH,
            fileName: 'menu-keyboard-support-example',
        },
        {
            language: 'typescript',
            code: menuKeyboardSrcT,
            fileName: 'menu-keyboard-support-example',
            component: 'MenuKeyboardSupportExampleComponent'
        }
    ];

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: menuSeparatorSrc,
            fileName: 'menu-separator-example',
        }
    ];
}
