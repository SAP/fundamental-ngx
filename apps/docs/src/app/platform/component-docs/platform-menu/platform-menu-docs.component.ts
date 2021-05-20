import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformBasicMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-basic-example.component.html';
import * as platformBasicMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-basic-example.component.ts';
import * as platformBasicMenuScss from '!raw-loader!./platform-menu-examples/platform-menu-basic-example.component.scss';

import * as platformXPositionMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-x-position-example.component.html';
import * as platformXPositionMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-x-position-example.component.ts';
import * as platformXPositionMenuScss from '!raw-loader!./platform-menu-examples/platform-menu-x-position-example.component.scss';

import * as platformCascadeMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-cascade-example.component.html';
import * as platformCascadeMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-cascade-example.component.ts';
import * as platformCascadeMenuScss from '!raw-loader!./platform-menu-examples/platform-menu-cascade-example.component.scss';

import * as platformScrollingMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-scrolling-example.component.html';
import * as platformScrollingMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-scrolling-example.component.ts';
import * as platformScrollingMenuScss from '!raw-loader!./platform-menu-examples/platform-menu-scrolling-example.component.scss';

import * as platformWithIconsMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-with-icons-example.component.html';
import * as platformWithIconsMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-with-icons-example.component.ts';
import * as platformWithIconsMenuScss from '!raw-loader!./platform-menu-examples/platform-menu-with-icons-example.component.scss';

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
