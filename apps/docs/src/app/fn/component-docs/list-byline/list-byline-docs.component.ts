import { Component } from '@angular/core';

import listDefaultExampleHtml from '!./examples/default/list-byline-default-example.component.html?raw';
import listDefaultExampleTs from '!./examples/default/list-byline-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-list',
    templateUrl: './list-byline-docs.component.html'
})
export class ListBylineDocsComponent {
    listDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'list-default-example',
            code: listDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: listDefaultExampleTs,
            fileName: 'list-default-example',
            component: 'ListDefaultExampleComponent'
        }
    ];
}
