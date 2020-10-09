import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as basicExampleHtml from '!raw-loader!./examples/dynamic-side-content-basic-example.component.html';

@Component({
    templateUrl: './dynamic-side-content-docs.component.html'
})
export class DynamicSideContentDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: basicExampleHtml,
            fileName: 'dynamic-side-content-basic-example'
        }
    ];
}
