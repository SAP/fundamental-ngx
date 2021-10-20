import { Component } from '@angular/core';

import * as menuHtml from '!raw-loader!./examples/menu-example.component.html';
import * as menuAddonHtml from '!raw-loader!./examples/menu-addon-example.component.html';
import * as menuMobileTs from '!raw-loader!./examples/menu-mobile-example.component.ts';
import * as menuMobileHtml from '!raw-loader!./examples/menu-mobile-example.component.html';
import * as menuSeparatorHtml from '!raw-loader!./examples/menu-separator-example.component.html';
import * as menuWithSubmenuHtml from '!raw-loader!./examples/menu-with-submenu-example.component.html';
import * as menuWithSubmenuTs from '!raw-loader!./examples/menu-with-submenu-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: menuHtml,
            fileName: 'menu-example'
        }
    ];
    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: menuAddonHtml,
            fileName: 'menu-addon-example'
        }
    ];

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: menuSeparatorHtml,
            fileName: 'menu-separator-example'
        }
    ];

    menuMobile: ExampleFile[] = [
        {
            language: 'html',
            code: menuMobileHtml,
            fileName: 'menu-mobile-example'
        },
        {
            language: 'typescript',
            code: menuMobileTs,
            fileName: 'menu-mobile-example',
            component: 'MenuMobileExampleComponent'
        }
    ];

    menuWithSubmenu: ExampleFile[] = [
        {
            language: 'html',
            code: menuWithSubmenuHtml,
            fileName: 'menu-with-submenu-example',
            typescriptFileCode: menuWithSubmenuTs,
            component: 'MenuWithSubmenuExampleComponent'
        }
    ];
}
