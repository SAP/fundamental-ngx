import { Component } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/menu-example.component.html';
import * as menuGroupSrc from '!raw-loader!./examples/menu-group-example.component.html';
import * as menuKeyboardSrcH from '!raw-loader!./examples/menu-keyboard-support-example.component.html';
import * as menuKeyboardSrcT from '!raw-loader!./examples/menu-keyboard-support-example.component.ts';
import * as menuSeparatorSrc from '!raw-loader!./examples/menu-separator-example.component.html';

import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent {

    menuBasic: ExampleFile[] = [{
        language: 'html',
        code: menuSrc
    }];

    menuGroup: ExampleFile[] = [{
        language: 'html',
        code: menuGroupSrc
    }];

    menuKeyboard: ExampleFile[] = [
        {
            language: 'html',
            code: menuKeyboardSrcH
        },
        {
            language: 'typescript',
            code: menuKeyboardSrcT
        }
    ];

    menuSeparator: ExampleFile[] = [{
        language: 'html',
        code: menuSeparatorSrc
    }];
}
