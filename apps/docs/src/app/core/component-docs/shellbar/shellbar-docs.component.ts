import { Component } from '@angular/core';

import shellbarBasicHTMLSrc from '!./examples/shellbar-basic-example.component.html?raw';
import shellbarBasicTSSrc from '!./examples/shellbar-basic-example.component.ts?raw';
import shellbarCollapsibleHTMLSrc from '!./examples/shellbar-collapsible-example.component.html?raw';
import shellbarCollapsibleTSSrc from '!./examples/shellbar-collapsible-example.component.ts?raw';
import sideNavShellbarHtml from '!./examples/shellbar-side-nav/shellbar-side-nav-example.component.html?raw';
import sideNavShellbarTs from '!./examples/shellbar-side-nav/shellbar-side-nav-example.component.ts?raw';
import sideNavShellbarScss from '!./examples/shellbar-side-nav/shellbar-side-nav-example.component.scss?raw';
import sideNavResponsiveShellbarTs from '!./examples/shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component.ts?raw';
import sideNavResponsiveShellbarScss from '!./examples/shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component.scss?raw';
import sideNavResponsiveShellbarHtml from '!./examples/shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component.html?raw';
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
        },
        {
            language: 'scss',
            code: sideNavShellbarScss,
            fileName: 'shellbar-side-nav-example',
            component: 'ShellbarSideNavExampleComponent',
            scssFileCode: sideNavShellbarScss
        }
    ];

    shellbarSideNavResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavResponsiveShellbarHtml,
            fileName: 'shellbar-side-nav-responsive-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarSideNavResponsiveExampleComponent',
            code: sideNavResponsiveShellbarTs,
            fileName: 'shellbar-side-nav-responsive-example',
            scssFileCode: sideNavResponsiveShellbarScss
        },
        {
            language: 'scss',
            code: sideNavResponsiveShellbarScss,
            fileName: 'shellbar-side-nav-responsive-example',
            component: 'ShellbarSideNavResponsiveExampleComponent',
            scssFileCode: sideNavResponsiveShellbarScss
        }
    ];
}
