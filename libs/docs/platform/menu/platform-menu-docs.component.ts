import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformMenuScrollingExampleComponent } from './examples/platform-menu-scrolling-example.component';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { PlatformMenuCascadeExampleComponent } from './examples/platform-menu-cascade-example.component';
import { PlatformMenuXPositionExampleComponent } from './examples/platform-menu-x-position-example.component';
import { PlatformMenuWithIconsExampleComponent } from './examples/platform-menu-with-icons-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformMenuBasicExampleComponent } from './examples/platform-menu-basic-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
    standalone: true,
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
