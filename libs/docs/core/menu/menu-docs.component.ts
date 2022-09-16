import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const menuHtml = 'menu-example.component.html';
const menuAddonHtml = 'menu-addon-example.component.html';
const menuMobileTs = 'menu-mobile-example.component.ts';
const menuMobileHtml = 'menu-mobile-example.component.html';
const menuSeparatorHtml = 'menu-separator-example.component.html';
const menuWithSubmenuHtml = 'menu-with-submenu-example.component.html';
const menuWithSubmenuTs = 'menu-with-submenu-example.component.ts';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
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
            typescriptFileCode: menuWithSubmenuTs,
            component: 'MenuWithSubmenuExampleComponent'
        }
    ];
}
