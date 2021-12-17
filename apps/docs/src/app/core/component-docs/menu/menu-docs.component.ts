import { Component } from '@angular/core';

import menuHtml from '!./examples/menu-example.component.html?raw';
import menuAddonHtml from '!./examples/menu-addon-example.component.html?raw';
import menuMobileTs from '!./examples/menu-mobile-example.component.ts?raw';
import menuMobileHtml from '!./examples/menu-mobile-example.component.html?raw';
import menuSeparatorHtml from '!./examples/menu-separator-example.component.html?raw';
import menuWithSubmenuHtml from '!./examples/menu-with-submenu-example.component.html?raw';
import menuWithSubmenuTs from '!./examples/menu-with-submenu-example.component.ts?raw';
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
