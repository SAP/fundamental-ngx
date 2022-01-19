import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import platformBasicMenuSrc from '!./platform-menu-examples/platform-menu-basic-example.component.html?raw';
import platformBasicMenuTsCode from '!./platform-menu-examples/platform-menu-basic-example.component.ts?raw';
import platformBasicMenuScss from '!./platform-menu-examples/platform-menu-basic-example.component.scss?raw';

import platformXPositionMenuSrc from '!./platform-menu-examples/platform-menu-x-position-example.component.html?raw';
import platformXPositionMenuTsCode from '!./platform-menu-examples/platform-menu-x-position-example.component.ts?raw';
import platformXPositionMenuScss from '!./platform-menu-examples/platform-menu-x-position-example.component.scss?raw';

import platformCascadeMenuSrc from '!./platform-menu-examples/platform-menu-cascade-example.component.html?raw';
import platformCascadeMenuTsCode from '!./platform-menu-examples/platform-menu-cascade-example.component.ts?raw';
import platformCascadeMenuScss from '!./platform-menu-examples/platform-menu-cascade-example.component.scss?raw';

import platformScrollingMenuSrc from '!./platform-menu-examples/platform-menu-scrolling-example.component.html?raw';
import platformScrollingMenuTsCode from '!./platform-menu-examples/platform-menu-scrolling-example.component.ts?raw';
import platformScrollingMenuScss from '!./platform-menu-examples/platform-menu-scrolling-example.component.scss?raw';

import platformWithIconsMenuSrc from '!./platform-menu-examples/platform-menu-with-icons-example.component.html?raw';
import platformWithIconsMenuTsCode from '!./platform-menu-examples/platform-menu-with-icons-example.component.ts?raw';
import platformWithIconsMenuScss from '!./platform-menu-examples/platform-menu-with-icons-example.component.scss?raw';

@Component({
    selector: 'app-menu',
    templateUrl: './platform-menu-docs.component.html'
})
export class PlatformMenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: platformBasicMenuSrc,
            fileName: 'platform-menu-basic-example',
            scssFileCode: platformBasicMenuScss
        },
        {
            language: 'typescript',
            code: platformBasicMenuTsCode,
            fileName: 'platform-menu-basic-example',
            component: 'PlatformMenuBasicExampleComponent'
        }
    ];

    menuXPosition: ExampleFile[] = [
        {
            language: 'html',
            code: platformXPositionMenuSrc,
            fileName: 'platform-menu-x-position-example',
            scssFileCode: platformXPositionMenuScss
        },
        {
            language: 'typescript',
            code: platformXPositionMenuTsCode,
            fileName: 'platform-menu-x-position-example',
            component: 'PlatformMenuXPositionExampleComponent'
        }
    ];

    menuCascade: ExampleFile[] = [
        {
            language: 'html',
            code: platformCascadeMenuSrc,
            fileName: 'platform-menu-cascade-example',
            scssFileCode: platformCascadeMenuScss
        },
        {
            language: 'typescript',
            code: platformCascadeMenuTsCode,
            fileName: 'platform-menu-cascade-example',
            component: 'PlatformMenuCascadeExampleComponent'
        }
    ];

    menuScrolling: ExampleFile[] = [
        {
            language: 'html',
            code: platformScrollingMenuSrc,
            fileName: 'platform-menu-scrolling-example',
            scssFileCode: platformScrollingMenuScss
        },
        {
            language: 'typescript',
            code: platformScrollingMenuTsCode,
            fileName: 'platform-menu-scrolling-example',
            component: 'PlatformMenuScrollingExampleComponent'
        }
    ];

    menuWithIcons: ExampleFile[] = [
        {
            language: 'html',
            code: platformWithIconsMenuSrc,
            fileName: 'platform-menu-with-icons-example',
            scssFileCode: platformWithIconsMenuScss
        },
        {
            language: 'typescript',
            code: platformWithIconsMenuTsCode,
            fileName: 'platform-menu-with-icons-example',
            component: 'PlatformMenuWithIconsExampleComponent'
        }
    ];
}
