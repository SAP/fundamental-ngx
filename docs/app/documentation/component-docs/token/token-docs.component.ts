import { Component } from '@angular/core';

import * as basicTokenH from '!raw-loader!./examples/token-example/token-example.component.html';

@Component({
    selector: 'app-token-docs',
    templateUrl: './token-docs.component.html',
    styleUrls: ['./token-docs.component.scss']
})
export class TokenDocsComponent {
    basicTokenHtml = basicTokenH;
}
