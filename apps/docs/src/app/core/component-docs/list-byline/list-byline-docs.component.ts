import { Component } from '@angular/core';

import * as bylineSrcHtml from '!raw-loader!./examples/list-byline-standard-example/list-byline-standard-example.component.html';
import * as bylineNavigationSrcHtml from '!raw-loader!./examples/list-byline-navigation-example/list-byline-navigation-example.component.html';
import * as bylineBorderlessSrcHtml from '!raw-loader!./examples/list-byline-borderless-example/list-byline-borderless-example.component.html';
import * as bylineSelectionSrcHtml from '!raw-loader!./examples/list-byline-selection-example/list-byline-selection-example.component.html';
import * as bylineSelectionSrcTs from '!raw-loader!./examples/list-byline-selection-example/list-byline-selection-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-list-byline',
    templateUrl: './list-byline-docs.component.html'
})
export class ListBylineDocsComponent {
    listByline: ExampleFile[] = [
        {
            language: 'html',
            code: bylineSrcHtml,
            fileName: 'list-byline-standard-example'
        }
    ];

    listBylineNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: bylineNavigationSrcHtml,
            fileName: 'list-byline-navigation-example'
        }
    ];

    listBylineBorderless: ExampleFile[] = [
        {
            language: 'html',
            code: bylineBorderlessSrcHtml,
            fileName: 'list-byline-borderless-example'
        }
    ];

    listBylineSelection: ExampleFile[] = [
        {
            language: 'html',
            code: bylineSelectionSrcHtml,
            fileName: 'list-byline-selection-example'
        },
        {
            language: 'typescript',
            code: bylineSelectionSrcTs,
            fileName: 'list-byline-selection-example',
            component: 'ListBylineSelectionExampleComponent'
        }
    ];
}
