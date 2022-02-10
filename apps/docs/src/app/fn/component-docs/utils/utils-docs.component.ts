import { Component } from '@angular/core';

import utilsDefaultExampleHtml from '!./examples/default/utils-default-example.component.html?raw';
import utilsDefaultExampleTs from '!./examples/default/utils-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-utils',
    templateUrl: './utils-docs.component.html'
})
export class UtilsDocsComponent {
    utilsDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'utils-default-example',
            code: utilsDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: utilsDefaultExampleTs,
            fileName: 'utils-default-example',
            component: 'UtilsDefaultExampleComponent'
        }
    ];
}
