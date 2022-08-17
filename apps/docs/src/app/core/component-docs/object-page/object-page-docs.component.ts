import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import objectPageBasicExample from '!./object-page-examples/object-page-example.component.html?raw';
import objectPageBasicExampleTsCode from '!./object-page-examples/object-page-example.component.ts?raw';

@Component({
    selector: 'app-object-page',
    templateUrl: './object-page-docs.component.html'
})
export class ObjectPageDocsComponent {
    objectPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: objectPageBasicExample,
            fileName: 'object-page-example'
        },
        {
            language: 'typescript',
            code: objectPageBasicExampleTsCode,
            fileName: 'object-page-example',
            component: 'ObjectPageExampleComponent'
        }
    ];
}
