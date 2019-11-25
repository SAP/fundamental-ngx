import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarBasicTSSrc from '!raw-loader!./examples/shellbar-basic-example.component.ts';
import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';
import * as shellbarCollapsibleTSSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.ts';
import * as advancedShellbarTs from '!raw-loader!./examples/shellbar-advanced/shellbar-advanced-example.component.ts';
import * as advancedShellbarHtml from '!raw-loader!./examples/shellbar-advanced/shellbar-advanced-example.component.html';
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

    advancedShellbar: ExampleFile[] = [
        {
            language: 'html',
            code: advancedShellbarHtml,
            fileName: 'shellbar-advanced/shellbar-advanced-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarAdvancedExampleComponent',
            code: advancedShellbarTs,
            fileName: 'shellbar-advanced/shellbar-advanced-example'
        }
    ];

    shellbarSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavShellbarHtml,
            fileName: 'shellbar-side-nav'
        },
        {
            language: 'typescript',
            component: 'ShellbarAdvancedExampleComponent',
            code: sideNavShellbarTs,
            fileName: 'shellbar-side-nav'
        }
    ];

}
