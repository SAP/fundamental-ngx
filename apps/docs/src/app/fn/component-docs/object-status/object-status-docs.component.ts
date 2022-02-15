import { Component } from '@angular/core';

import objectStatusDefaultExampleHtml from '!./examples/default/object-status-default-example.component.html?raw';
import objectStatusDefaultExampleTs from '!./examples/default/object-status-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-object-status',
    templateUrl: './object-status-docs.component.html'
})
export class ObjectStatusDocsComponent {
    objectStatusDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'object-status-default-example',
            code: objectStatusDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: objectStatusDefaultExampleTs,
            fileName: 'object-status-default-example',
            component: 'ObjectStatusDefaultExampleComponent'
        }
    ];
}
