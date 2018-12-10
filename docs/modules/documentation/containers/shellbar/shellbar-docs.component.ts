import { Component } from '@angular/core';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html'
})
export class ShellbarDocsComponent {
    shellbarBasicExampleHtml = shellbarBasicHTMLSrc;
    shellbarCollapsibleExampleHtml = shellbarCollapsibleHTMLSrc;

    constructor() {}
}
