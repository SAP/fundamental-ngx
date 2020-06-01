import { Component } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/menu-example.component.html';
import * as menuAddon from '!raw-loader!./examples/menu-addon-example.component.html';
import * as menuSeparatorSrc from '!raw-loader!./examples/menu-separator-example.component.html';
import * as menuMobileSrc from '!raw-loader!./examples/menu-mobile-example.component.html';
import * as menuWithSubmenuSrc from '!raw-loader!./examples/menu-with-submenu-example.component.html';

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
            fileName: 'menu-example'
        }
    ];
    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: menuAddon,
            fileName: 'menu-addon-example',
        }
    ];

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: menuSeparatorSrc,
            fileName: 'menu-separator-example'
        }
    ];

    menuMobile: ExampleFile[] = [
        {
            language: 'html',
            code: menuMobileSrc,
            fileName: 'menu-mobile-example'
        }
    ];

    menuWithSubmenu: ExampleFile[] = [
        {
            language: 'html',
            code: menuWithSubmenuSrc,
            fileName: 'menu-with-submenu-example'
        }
    ];
}
