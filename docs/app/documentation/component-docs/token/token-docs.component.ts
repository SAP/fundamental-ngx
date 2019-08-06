import { Component } from '@angular/core';

import * as basicTokenH from '!raw-loader!./examples/token-example/token-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-token-docs',
    templateUrl: './token-docs.component.html',
    styleUrls: ['./token-docs.component.scss']
})
export class TokenDocsComponent {

    basicToken: ExampleFile[] = [{
        language: 'html',
        code: basicTokenH
    }];

}
