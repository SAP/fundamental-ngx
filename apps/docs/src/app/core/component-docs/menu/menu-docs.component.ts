import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/menu-example.component.html';
import * as menuAddon from '!raw-loader!./examples/menu-addon-example.component.html';
import * as menuAddonTsCode from '!raw-loader!./examples/menu-addon-examples.component.ts';
import * as menuGroupSrc from '!raw-loader!./examples/menu-group-example.component.html';
import * as menuKeyboardSrcH from '!raw-loader!./examples/menu-keyboard-support-example.component.html';
import * as menuKeyboardSrcT from '!raw-loader!./examples/menu-keyboard-support-example.component.ts';
import * as menuSeparatorSrc from '!raw-loader!./examples/menu-separator-example.component.html';
import * as menuTsCode from '!raw-loader!./examples/menu-examples.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent implements OnInit {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: menuSrc,
            fileName: 'menu-example',
            secondFile: 'menu-examples',
            typescriptFileCode: menuTsCode,
            component: 'MenuAddonExampleComponent'
        }
    ];
    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: menuAddon,
            fileName: 'menu-addon-example',
            secondFile: 'menu-addon-examples',
            typescriptFileCode: menuAddonTsCode,
            component: 'MenuExampleComponent'
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: menuGroupSrc,
            fileName: 'menu-group-example',
            secondFile: 'menu-examples',
            typescriptFileCode: menuTsCode,
            component: 'MenuGroupExampleComponent'
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
            secondFile: 'menu-examples',
            typescriptFileCode: menuTsCode,
            component: 'MenuSeparatorExampleComponent'
        }
    ];

    ngOnInit() { }
}
