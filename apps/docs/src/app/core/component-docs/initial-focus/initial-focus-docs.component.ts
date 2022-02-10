import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import basicExampleHtml from '!./examples/initial-focus-basic-example.component.html?raw';
import basicExampleTs from '!./examples/initial-focus-basic-example.component.ts?raw';

import complexExampleHtml from '!./examples/initial-focus-complex-example.component.html?raw';
import complexExampleTs from '!./examples/initial-focus-complex-example.component.ts?raw';

@Component({
    selector: 'fd-initial-focus-docs',
    templateUrl: './initial-focus-docs.component.html'
})
export class InitialFocusDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: basicExampleHtml,
            fileName: 'initial-focus-basic-example'
        },
        {
            language: 'typescript',
            code: basicExampleTs,
            fileName: 'initial-focus-basic-example',
            component: 'AutofocusBasicExampleComponent'
        }
    ];

    complex: ExampleFile[] = [
        {
            language: 'html',
            code: complexExampleHtml,
            fileName: 'initial-focus-complex-example'
        },
        {
            language: 'typescript',
            code: complexExampleTs,
            fileName: 'initial-focus-complex-example',
            component: 'AutofocusComplexExampleComponent'
        }
    ];
}
