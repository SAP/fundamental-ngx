import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformMenuBasicExampleComponent } from './examples/platform-menu-basic-example.component';
import { PlatformMenuCascadeExampleComponent } from './examples/platform-menu-cascade-example.component';
import { PlatformMenuScrollingExampleComponent } from './examples/platform-menu-scrolling-example.component';
import { PlatformMenuWithIconsExampleComponent } from './examples/platform-menu-with-icons-example.component';
import { PlatformMenuXPositionExampleComponent } from './examples/platform-menu-x-position-example.component';

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
    templateUrl: './platform-menu-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformMenuBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformMenuWithIconsExampleComponent,
        PlatformMenuXPositionExampleComponent,
        PlatformMenuCascadeExampleComponent,
        LinkComponent,
        RouterLink,
        PlatformMenuScrollingExampleComponent
    ]
})
export class PlatformMenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformBasicMenuSrc),
            fileName: 'platform-menu-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformBasicMenuTsCode),
            fileName: 'platform-menu-basic-example',
            component: 'PlatformMenuBasicExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(platformBaseMenuScss),
            fileName: 'platform-menu-example-styles',
            pure: true
        }
    ];

    menuXPosition: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformXPositionMenuSrc),
            fileName: 'platform-menu-x-position-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformXPositionMenuTsCode),
            fileName: 'platform-menu-x-position-example',
            component: 'PlatformMenuXPositionExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(platformBaseMenuScss),
            fileName: 'platform-menu-example-styles',
            pure: true
        }
    ];

    menuCascade: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformCascadeMenuSrc),
            fileName: 'platform-menu-cascade-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformCascadeMenuTsCode),
            fileName: 'platform-menu-cascade-example',
            component: 'PlatformMenuCascadeExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(platformBaseMenuScss),
            fileName: 'platform-menu-example-styles',
            pure: true
        }
    ];

    menuScrolling: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformScrollingMenuSrc),
            fileName: 'platform-menu-scrolling-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformScrollingMenuTsCode),
            fileName: 'platform-menu-scrolling-example',
            component: 'PlatformMenuScrollingExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(platformBaseMenuScss),
            fileName: 'platform-menu-example-styles',
            pure: true
        }
    ];

    menuWithIcons: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformWithIconsMenuSrc),
            fileName: 'platform-menu-with-icons-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformWithIconsMenuTsCode),
            fileName: 'platform-menu-with-icons-example',
            component: 'PlatformMenuWithIconsExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(platformBaseMenuScss),
            fileName: 'platform-menu-example-styles',
            pure: true
        }
    ];
}
