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
import { MenuDisabledExampleComponent } from './examples/menu-disabled-example.component';
import {
    MenuAddonExampleComponent,
    MenuExampleComponent,
    MenuSeparatorExampleComponent
} from './examples/menu-examples.component';
import { MenuMobileExampleComponent } from './examples/menu-mobile-example.component';
import { MenuPlacementExampleComponent } from './examples/menu-placement-example.component';
import { MenuProgrammaticExampleComponent } from './examples/menu-programmatic-example.component';
import { MenuScrollbarExampleComponent } from './examples/menu-scrollbar-example.component';
import { MenuWithSubmenuExampleComponent } from './examples/menu-with-submenu-example.component';

const menuHtml = 'menu-example.component.html';
const menuTs = 'menu-examples.component.ts';
const menuAddonHtml = 'menu-addon-example.component.html';
const menuAddonScss = 'menu-addon-example.component.scss';
const menuMobileTs = 'menu-mobile-example.component.ts';
const menuMobileHtml = 'menu-mobile-example.component.html';
const menuSeparatorHtml = 'menu-separator-example.component.html';
const menuScrollbarHtml = 'menu-scrollbar-example.component.html';
const menuScrollbarTs = 'menu-scrollbar-example.component.ts';
const menuWithSubmenuHtml = 'menu-with-submenu-example.component.html';
const menuWithSubmenuTs = 'menu-with-submenu-example.component.ts';
const menuProgrammaticTs = 'menu-programmatic-example.component.ts';
const menuDisabledTs = 'menu-disabled-example.component.ts';
const menuPlacementTs = 'menu-placement-example.component.ts';

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
        ExtendedMenuExampleComponent,
        MenuProgrammaticExampleComponent,
        MenuDisabledExampleComponent,
        MenuPlacementExampleComponent
    ]
})
export class MenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuHtml),
            fileName: 'menu-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuTs),
            fileName: 'menu-examples',
            component: 'MenuExampleComponent'
        }
    ];
    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuAddonHtml),
            fileName: 'menu-addon-example',
            scssFileCode: getAssetFromModuleAssets(menuAddonScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuTs),
            fileName: 'menu-examples',
            component: 'MenuAddonExampleComponent'
        }
    ];

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuSeparatorHtml),
            fileName: 'menu-separator-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuTs),
            fileName: 'menu-examples',
            component: 'MenuSeparatorExampleComponent'
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

    menuProgrammatic: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuProgrammaticTs),
            fileName: 'menu-programmatic-example',
            component: 'MenuProgrammaticExampleComponent'
        }
    ];

    menuDisabled: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuDisabledTs),
            fileName: 'menu-disabled-example',
            component: 'MenuDisabledExampleComponent'
        }
    ];

    menuPlacement: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuPlacementTs),
            fileName: 'menu-placement-example',
            component: 'MenuPlacementExampleComponent'
        }
    ];
}
