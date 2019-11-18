import { OnInit, Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformBasicMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-basic-example.component.html';
import * as platformBasicMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-basic-example.component.ts';
import * as platformBasicMenuScss from '!raw-loader!./platform-menu-examples/platform-menu-basic-example.component.scss';

import * as platformMenuSeparatorSrc from '!raw-loader!./platform-menu-examples/platform-menu-separator-example.component.html';
import * as platformMenuSeparatorTsCode from '!raw-loader!./platform-menu-examples/platform-menu-separator-example.component.ts';
import * as platformMenuSeparatorScss from '!raw-loader!./platform-menu-examples/platform-menu-separator-example.component.scss';

import * as platformMenuAddonSrc from '!raw-loader!./platform-menu-examples/platform-menu-icons-example.component.html';
import * as platformMenuAddonTsCode from '!raw-loader!./platform-menu-examples/platform-menu-icons-example.component.ts';
import * as platformMenuAddonScss from '!raw-loader!./platform-menu-examples/platform-menu-icons-example.component.scss';

import * as platformMenuGroupSrc from '!raw-loader!./platform-menu-examples/platform-menu-group-example.component.html';
import * as platformMenuGroupTsCode from '!raw-loader!./platform-menu-examples/platform-menu-group-example.component.ts';
import * as platformMenuGroupScss from '!raw-loader!./platform-menu-examples/platform-menu-group-example.component.scss';

import * as platformComplexMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-complex-example.component.html';
import * as platformComplexMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-complex-example.component.ts';
import * as platformComplexMenuScss from '!raw-loader!./platform-menu-examples/platform-menu-complex-example.component.scss';

import * as platformMenuClickCloseSrc from '!raw-loader!./platform-menu-examples/platform-menu-click-close-example.component.html';
import * as platformMenuClickCloseTsCode from '!raw-loader!./platform-menu-examples/platform-menu-click-close-example.component.ts';
import * as platformMenuClickCloseScss from '!raw-loader!./platform-menu-examples/platform-menu-click-close-example.component.scss';

import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './platform-menu-docs.component.html'
})
export class PlatformMenuDocsComponent implements OnInit {
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

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: platformMenuSeparatorSrc,
            fileName: 'platform-menu-separator-example',
            scssFileCode: platformMenuSeparatorScss
        },
        {
            language: 'typescript',
            code: platformMenuSeparatorTsCode,
            fileName: 'platform-menu-separator-example',
            component: 'PlatformMenuSeparatorExampleComponent'
        }
    ];

    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: platformMenuAddonSrc,
            fileName: 'platform-menu-icons-example',
            scssFileCode: platformMenuAddonScss
        },
        {
            language: 'typescript',
            code: platformMenuAddonTsCode,
            fileName: 'platform-menu-icons-example',
            component: 'PlatformMenuIconsExampleComponent'
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: platformMenuGroupSrc,
            fileName: 'platform-menu-group-example',
            scssFileCode: platformMenuGroupScss
        },
        {
            language: 'typescript',
            code: platformMenuGroupTsCode,
            fileName: 'platform-menu-group-example',
            component: 'PlatformMenuGroupExampleComponent'
        }
    ];

    menuComplex: ExampleFile[] = [
        {
            language: 'html',
            code: platformComplexMenuSrc,
            fileName: 'platform-menu-complex-example',
            scssFileCode: platformComplexMenuScss
        },
        {
            language: 'typescript',
            code: platformComplexMenuTsCode,
            fileName: 'platform-menu-complex-example',
            component: 'PlatformMenuComplexExampleComponent'
        }
    ];

    menuClickClose: ExampleFile[] = [
        {
            language: 'html',
            code: platformMenuClickCloseSrc,
            fileName: 'platform-menu-click-close-example',
            scssFileCode: platformMenuClickCloseScss
        },
        {
            language: 'typescript',
            code: platformMenuClickCloseTsCode,
            fileName: 'platform-menu-click-close-example',
            component: 'PlatformMenuClickCloseExampleComponent'
        }
    ];

    ngOnInit() {}
}
