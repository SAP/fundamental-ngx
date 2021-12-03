import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as defaultExampleTs from '!raw-loader!./examples/scrollbar-example.component.ts';
import * as noHorizontalScrollExampleTs from '!raw-loader!./examples/scrollbar-no-horizontal-example.component.ts';
import * as noVerticalScrollExampleTs from '!raw-loader!./examples/scrollbar-no-vertical-example.component.ts';

@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar-docs.component.html'
})
export class ScrollbarDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: defaultExampleTs,
            fileName: 'scrollbar-example',
            component: 'ScrollbarExampleComponent'
        }
    ];

    noHorizontalExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: noHorizontalScrollExampleTs,
            fileName: 'scrollbar-no-horizontal-example',
            component: 'ScrollbarNoHorizontalExampleComponent'
        }
    ];

    noVerticalExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: noVerticalScrollExampleTs,
            fileName: 'scrollbar-no-vertical-example',
            component: 'ScrollbarNoVerticalExampleComponent'
        }
    ];
}
