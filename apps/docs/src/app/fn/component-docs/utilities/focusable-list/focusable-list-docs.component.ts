import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';
import defaultExampleHtml from '!./examples/default-example/default-example.component.html?raw';
import defaultExampleTs from '!./examples/default-example/default-example.component.ts?raw';

@Component({
    selector: 'app-tabs',
    templateUrl: './focusable-list-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FocusableListDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: defaultExampleHtml,
            language: 'html',
            fileName: 'focusable-list-default-example',
            component: 'FocusableListDefaultExample'
        },
        {
            code: defaultExampleTs,
            language: 'ts',
            fileName: 'focusable-list-default-example',
            component: 'FocusableListDefaultExample'
        }
    ];

    constructor() {}
}
