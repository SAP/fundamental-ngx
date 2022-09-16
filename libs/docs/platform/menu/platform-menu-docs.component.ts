import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformBasicMenuSrc = 'platform-menu-basic-example.component.html';
const platformBasicMenuTsCode = 'platform-menu-basic-example.component.ts';
const platformBaseMenuScss = 'platform-menu-example-styles.scss';

const platformXPositionMenuSrc = 'platform-menu-x-position-example.component.html';
const platformXPositionMenuTsCode = 'platform-menu-x-position-example.component.ts';

const platformCascadeMenuSrc = 'platform-menu-cascade-example.component.html';
const platformCascadeMenuTsCode = 'platform-menu-cascade-example.component.ts';

const platformScrollingMenuSrc = 'platform-menu-scrolling-example.component.html';
const platformScrollingMenuTsCode = 'platform-menu-scrolling-example.component.ts';

const platformWithIconsMenuSrc = 'platform-menu-with-icons-example.component.html';
const platformWithIconsMenuTsCode = 'platform-menu-with-icons-example.component.ts';

@Component({
    selector: 'app-menu',
    templateUrl: './platform-menu-docs.component.html'
})
export class PlatformMenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformBasicMenuSrc),
            fileName: 'platform-menu-basic-example',
            scssFileCode: getAssetFromModuleAssets(platformBaseMenuScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformBasicMenuTsCode),
            fileName: 'platform-menu-basic-example',
            component: 'PlatformMenuBasicExampleComponent'
        }
    ];

    menuXPosition: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformXPositionMenuSrc),
            fileName: 'platform-menu-x-position-example',
            scssFileCode: getAssetFromModuleAssets(platformBaseMenuScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformXPositionMenuTsCode),
            fileName: 'platform-menu-x-position-example',
            component: 'PlatformMenuXPositionExampleComponent'
        }
    ];

    menuCascade: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformCascadeMenuSrc),
            fileName: 'platform-menu-cascade-example',
            scssFileCode: getAssetFromModuleAssets(platformBaseMenuScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformCascadeMenuTsCode),
            fileName: 'platform-menu-cascade-example',
            component: 'PlatformMenuCascadeExampleComponent'
        }
    ];

    menuScrolling: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformScrollingMenuSrc),
            fileName: 'platform-menu-scrolling-example',
            scssFileCode: getAssetFromModuleAssets(platformBaseMenuScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformScrollingMenuTsCode),
            fileName: 'platform-menu-scrolling-example',
            component: 'PlatformMenuScrollingExampleComponent'
        }
    ];

    menuWithIcons: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformWithIconsMenuSrc),
            fileName: 'platform-menu-with-icons-example',
            scssFileCode: getAssetFromModuleAssets(platformBaseMenuScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformWithIconsMenuTsCode),
            fileName: 'platform-menu-with-icons-example',
            component: 'PlatformMenuWithIconsExampleComponent'
        }
    ];
}
