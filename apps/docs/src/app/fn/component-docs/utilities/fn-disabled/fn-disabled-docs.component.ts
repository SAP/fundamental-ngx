import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';
import defaultExampleHtml from '!./examples/default-example/default-example.component.html?raw';
import defaultExampleTs from '!./examples/default-example/default-example.component.ts?raw';

@Component({
    selector: 'app-tabs',
    templateUrl: './fn-disabled-docs.component.html',
    styleUrls: ['fn-disabled-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FnDisabledDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: defaultExampleHtml,
            language: 'html',
            fileName: 'fn-disabled-default-example',
            component: 'FnDisabledDefaultExample'
        },
        {
            code: defaultExampleTs,
            language: 'ts',
            fileName: 'fn-disabled-default-example',
            component: 'FnDisabledDefaultExample'
        }
    ];

    constructor() {}
}
