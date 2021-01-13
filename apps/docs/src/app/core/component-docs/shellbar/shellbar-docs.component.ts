import { Component } from '@angular/core';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarBasicTSSrc from '!raw-loader!./examples/shellbar-basic-example.component';

import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';
import * as shellbarCollapsibleTSSrc from '!raw-loader!./examples/shellbar-collapsible-example.component';

import * as sideNavShellbarHtml from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component.html';
import * as sideNavShellbarTs from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component';
import * as sideNavShellbarScss from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component.scss';

import * as shellbarUserActionsMenuHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-example.component.html';
import * as shellbarUserActionsMenuTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-example.component';

import * as shellbarUserActionsMenuHeaderHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-header-example.component.html';
import * as shellbarUserActionsMenuHeaderTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-header-example.component';

import * as shellbarUserActionsMenuWithoutHeaderHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-without-header-example.component.html';
import * as shellbarUserActionsMenuWithoutHeaderTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-without-header-example.component';

import * as shellbarUserActionsMenuHeaderWithAddonsHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-header-with-addons-example.component.html';
import * as shellbarUserActionsMenuHeaderWithAddonsTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-header-with-addons-example.component';

import * as shellbarUserActionsMenuFooterHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-footer-example.component.html';
import * as shellbarUserActionsMenuFooterTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-footer-example.component';

import * as shellbarUserActionsMenuSubmenuHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-submenu-example.component.html';
import * as shellbarUserActionsMenuSubmenuTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-submenu-example.component';

import * as shellbarUserActionsMenuCompactHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-compact-example.component.html';
import * as shellbarUserActionsMenuCompactTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-compact-example.component';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html'
})
export class ShellbarDocsComponent {
    shellbarBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarBasicHTMLSrc,
            fileName: 'shellbar-basic-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarBasicExampleComponent',
            code: shellbarBasicTSSrc,
            fileName: 'shellbar-basic-example'
        }
    ];

    shellbarCollapsible: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarCollapsibleHTMLSrc,
            fileName: 'shellbar-collapsible-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarCollapsibleExampleComponent',
            code: shellbarCollapsibleTSSrc,
            fileName: 'shellbar-collapsible-example'
        }
    ];

    shellbarSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavShellbarHtml,
            fileName: 'shellbar-side-nav-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarSideNavExampleComponent',
            code: sideNavShellbarTs,
            fileName: 'shellbar-side-nav-example',
            scssFileCode: sideNavShellbarScss
        }
    ];

    shellbarUserActionsMenuExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuHTMLSrc,
            fileName: 'shellbar-user-actions-menu-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuExample',
            code: shellbarUserActionsMenuTsSrc,
            fileName: 'shellbar-user-actions-menu-example'
        }
    ];

    shellbarUserActionsMenuHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuHeaderHTMLSrc,
            fileName: 'shellbar-user-actions-menu-header-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuHeaderExample',
            code: shellbarUserActionsMenuHeaderTsSrc,
            fileName: 'shellbar-user-actions-menu-header-example'
        }
    ];

    shellbarUserActionsMenuWithoutHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuWithoutHeaderHTMLSrc,
            fileName: 'shellbar-user-actions-menu-without-header-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuWithoutHeaderExample',
            code: shellbarUserActionsMenuWithoutHeaderTsSrc,
            fileName: 'shellbar-user-actions-menu-without-header-example'
        }
    ];

    shellbarUserActionsMenuHeaderWithAddonsExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuHeaderWithAddonsHTMLSrc,
            fileName: 'shellbar-user-actions-menu-header-with-addons-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuHeaderWithAddonsExample',
            code: shellbarUserActionsMenuHeaderWithAddonsTsSrc,
            fileName: 'shellbar-user-actions-menu-header-with-addons-example'
        }
    ];

    shellbarUserActionsMenuFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuFooterHTMLSrc,
            fileName: 'shellbar-user-actions-menu-footer-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuFooterExample',
            code: shellbarUserActionsMenuFooterTsSrc,
            fileName: 'shellbar-user-actions-menu-footer-example'
        }
    ];

    shellbarUserActionsMenuSubmenuExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuSubmenuHTMLSrc,
            fileName: 'shellbar-user-actions-menu-submenu-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuSubmenuExample',
            code: shellbarUserActionsMenuSubmenuTsSrc,
            fileName: 'shellbar-user-actions-menu-submenu-example'
        }
    ];

    shellbarUserActionsMenuCompactExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuCompactHTMLSrc,
            fileName: 'shellbar-user-actions-menu-compact-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuCompactExample',
            code: shellbarUserActionsMenuCompactTsSrc,
            fileName: 'shellbar-user-actions-menu-compact-example'
        }
    ];
}
