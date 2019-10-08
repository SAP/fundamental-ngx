import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarBasicTSSrc from '!raw-loader!./examples/shellbar-basic-example.component.ts';
import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';
import * as shellbarCollapsibleTSSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.ts';
import * as advancedShellbarTs from '!raw-loader!./examples/shellbar-advanced/shellbar-advanced-example.component.ts';
import * as advancedShellbarHtml from '!raw-loader!./examples/shellbar-advanced/shellbar-advanced-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html'
})
export class ShellbarDocsComponent {
    shellbarBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarBasicHTMLSrc
        },
        {
            language: 'typescript',
            code: shellbarBasicTSSrc
        }
    ];

    shellbarCollapsible: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarCollapsibleHTMLSrc
        },
        {
            language: 'typescript',
            code: shellbarCollapsibleTSSrc
        }
    ];

    advancedShellbar: ExampleFile[] = [
        {
            language: 'html',
            code: advancedShellbarHtml,
        },
        {
            language: 'typescript',
            code: advancedShellbarTs
        }
    ];

}
