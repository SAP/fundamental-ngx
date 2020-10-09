import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as basicExampleHtml from '!raw-loader!./examples/dynamic-side-content-basic-example.component.html';
import * as positioningExampleHtml from '!raw-loader!./examples/dynamic-side-content-positioning-example.component.html';
import * as sizeExampleHtml from '!raw-loader!./examples/dynamic-side-content-size-example.component.html';

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

    positioning: ExampleFile[] = [
        {
            language: 'html',
            code: positioningExampleHtml,
            fileName: 'dynamic-side-content-positioning-example'
        }
    ];

    size: ExampleFile[] = [
        {
            language: 'html',
            code: sizeExampleHtml,
            fileName: 'dynamic-side-content-size-example'
        }
    ];
}
