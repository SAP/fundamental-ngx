import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ExtendedMenuExampleComponent } from './examples/extended-menu-example.component';
import {
    MenuAddonExampleComponent,
    MenuExampleComponent,
    MenuSeparatorExampleComponent
} from './examples/menu-examples.component';
import { MenuMobileExampleComponent } from './examples/menu-mobile-example.component';
import { MenuScrollbarExampleComponent } from './examples/menu-scrollbar-example.component';
import { MenuWithSubmenuExampleComponent } from './examples/menu-with-submenu-example.component';

const menuHtml = 'menu-example.component.html';
const menuAddonHtml = 'menu-addon-example.component.html';
const menuMobileTs = 'menu-mobile-example.component.ts';
const menuMobileHtml = 'menu-mobile-example.component.html';
const menuSeparatorHtml = 'menu-separator-example.component.html';
const menuScrollbarHtml = 'menu-scrollbar-example.component.html';
const menuScrollbarTs = 'menu-scrollbar-example.component.ts';
const menuWithSubmenuHtml = 'menu-with-submenu-example.component.html';
const menuWithSubmenuTs = 'menu-with-submenu-example.component.ts';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        MenuExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        MenuAddonExampleComponent,
        MenuSeparatorExampleComponent,
        MenuScrollbarExampleComponent,
        MenuWithSubmenuExampleComponent,
        RouterLink,
        MenuMobileExampleComponent,
        ExtendedMenuExampleComponent
    ]
})
export class MenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuHtml),
            fileName: 'menu-example'
        }
    ];
    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuAddonHtml),
            fileName: 'menu-addon-example'
        }
    ];

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuSeparatorHtml),
            fileName: 'menu-separator-example'
        }
    ];

    menuScrollbar: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuScrollbarHtml),
            fileName: 'menu-scrollbar-example',
            component: 'MenuScrollbarExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuScrollbarTs),
            fileName: 'menu-scrollbar-example',
            component: 'MenuScrollbarExampleComponent'
        }
    ];

    menuMobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuMobileHtml),
            fileName: 'menu-mobile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuMobileTs),
            fileName: 'menu-mobile-example',
            component: 'MenuMobileExampleComponent'
        }
    ];

    menuWithSubmenu: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuWithSubmenuHtml),
            fileName: 'menu-with-submenu-example',
            component: 'MenuWithSubmenuExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuWithSubmenuTs),
            fileName: 'menu-with-submenu-example',
            component: 'MenuWithSubmenuExampleComponent'
        }
    ];

    extendedMenu: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets('extended-menu-example.component.ts'),
            fileName: 'extended-menu-example',
            component: 'ExtendedMenuExampleComponent'
        }
    ];
}
