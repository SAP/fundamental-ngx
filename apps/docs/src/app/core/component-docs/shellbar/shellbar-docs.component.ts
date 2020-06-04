import { Component } from '@angular/core';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarBasicTSSrc from '!raw-loader!./examples/shellbar-basic-example.component.ts';
import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';
import * as shellbarCollapsibleTSSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.ts';
import * as sideNavShellbarHtml from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component.html';
import * as sideNavShellbarTs from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component.ts';
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
            fileName: 'shellbar-side-nav-example'
        }
    ];
}
