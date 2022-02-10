import { Component } from '@angular/core';

import cdkDefaultExampleHtml from '!./examples/default/cdk-default-example.component.html?raw';
import cdkDefaultExampleTs from '!./examples/default/cdk-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-cdk',
    templateUrl: './cdk-docs.component.html'
})
export class CdkDocsComponent {
    cdkDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'cdk-default-example',
            code: cdkDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: cdkDefaultExampleTs,
            fileName: 'cdk-default-example',
            component: 'CdkDefaultExampleComponent'
        }
    ];
}
