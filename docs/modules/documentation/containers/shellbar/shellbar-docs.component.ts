import { Component } from '@angular/core';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarBasicTSSrc from '!raw-loader!./examples/shellbar-basic-example.component.ts';
import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';
import * as shellbarCollapsibleTSSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.ts';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html'
})
export class ShellbarDocsComponent {
    shellbarBasicExampleHtml = shellbarBasicHTMLSrc;
    shellbarCollapsibleExampleHtml = shellbarCollapsibleHTMLSrc;
    shellbarBasicExampleTs = shellbarBasicTSSrc;
    shellbarCollapsibleExampleTs = shellbarCollapsibleTSSrc;

    constructor() {}
}
