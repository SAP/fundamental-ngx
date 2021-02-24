import { Component } from '@angular/core';

import * as bylineSrcHtml from '!raw-loader!./examples/list-byline-standard-example/list-byline-standard-example.component.html';
import * as bylineNavigationSrcHtml from '!raw-loader!./examples/list-byline-navigation-example/list-byline-navigation-example.component.html';
import * as bylineBorderlessSrcHtml from '!raw-loader!./examples/list-byline-borderless-example/list-byline-borderless-example.component.html';
import * as bylineSelectionSrcHtml from '!raw-loader!./examples/list-byline-selection-example/list-byline-selection-example.component.html';
import * as bylineSelectionSrcTs from '!raw-loader!./examples/list-byline-selection-example/list-byline-selection-example.component.ts';
import * as bylineButtonsHtml from '!raw-loader!./examples/list-byline-button-example/list-byline-button-example.component.html'
import * as bylineInteractiveHtml from '!raw-loader!./examples/list-byline-interactive-example/list-byline-interactive-example.component.html';
import * as bylineWrapHtml from '!raw-loader!./examples/list-byline-wrap-example/list-byline-wrap-example.component.html';
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

    listBylineComplex: ExampleFile[] = [
        {
            language: 'html',
            code: bylineButtonsHtml,
            fileName: 'list-byline-button-example',
            component: 'ListBylineButtonExampleComponent',
        },
    ];

    interactiveList: ExampleFile[] = [
        {
            language: 'html',
            code: bylineInteractiveHtml,
            fileName: 'list-byline-interactive-example',
            component: 'ListBylineInteractiveExampleComponent',
        },
    ];

    wrapList: ExampleFile[] = [
        {
            language: 'html',
            code: bylineWrapHtml,
            fileName: 'list-byline-wrap-example',
            component: 'ListBylineWrapExampleComponent',
        },
    ];
}
