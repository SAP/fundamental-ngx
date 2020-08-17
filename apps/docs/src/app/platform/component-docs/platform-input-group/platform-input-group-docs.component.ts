import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as inputGroupStandardExampleHtml from '!raw-loader!./platform-input-group-examples/platform-input-group-standard-example.component.html';

@Component({
    selector: 'app-input-group',
    templateUrl: './platform-input-group-docs.component.html'
})
export class PlatformInputGroupDocsComponent {
    inputGroupStandard: ExampleFile[] = [
        {
            language: 'html',
            code: inputGroupStandardExampleHtml,
            fileName: 'platform-input-group-standard-example'
        }
    ];
}
