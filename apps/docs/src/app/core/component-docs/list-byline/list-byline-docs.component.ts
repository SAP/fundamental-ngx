import { Component } from '@angular/core';

import bylineSrcHtml from '!./examples/list-byline-standard-example/list-byline-standard-example.component.html?raw';
import bylineNavigationSrcHtml from '!./examples/list-byline-navigation-example/list-byline-navigation-example.component.html?raw';
import bylineBorderlessSrcHtml from '!./examples/list-byline-borderless-example/list-byline-borderless-example.component.html?raw';
import bylineSelectionSrcHtml from '!./examples/list-byline-selection-example/list-byline-selection-example.component.html?raw';
import bylineSelectionSrcTs from '!./examples/list-byline-selection-example/list-byline-selection-example.component.ts?raw';
import bylineButtonsTs from '!./examples/list-byline-button-example/list-byline-button-example.component.ts?raw';
import bylineButtonsHtml from '!./examples/list-byline-button-example/list-byline-button-example.component.html?raw';
import bylineInteractiveTs from '!./examples/list-byline-interactive-example/list-byline-interactive-example.component.ts?raw';
import bylineInteractiveHtml from '!./examples/list-byline-interactive-example/list-byline-interactive-example.component.html?raw';
import bylineWrapTs from '!./examples/list-byline-wrap-example/list-byline-wrap-example.component.ts?raw';
import bylineWrapHtml from '!./examples/list-byline-wrap-example/list-byline-wrap-example.component.html?raw';
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
            fileName: 'list-byline-button-example'
        },
        {
            language: 'typescript',
            code: bylineButtonsTs,
            fileName: 'list-byline-button-example',
            component: 'ListBylineButtonExampleComponent'
        }
    ];

    interactiveList: ExampleFile[] = [
        {
            language: 'html',
            code: bylineInteractiveHtml,
            fileName: 'list-byline-interactive-example'
        },
        {
            language: 'typescript',
            code: bylineInteractiveTs,
            fileName: 'list-byline-interactive-example',
            component: 'ListBylineInteractiveExampleComponent'
        }
    ];

    wrapList: ExampleFile[] = [
        {
            language: 'html',
            code: bylineWrapHtml,
            fileName: 'list-byline-wrap-example'
        },
        {
            language: 'typescript',
            code: bylineWrapTs,
            fileName: 'list-byline-wrap-example',
            component: 'ListBylineWrapExampleComponent'
        }
    ];
}
