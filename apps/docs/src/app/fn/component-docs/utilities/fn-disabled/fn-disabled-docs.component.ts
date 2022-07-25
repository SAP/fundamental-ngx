import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import defaultExampleHtml from '!./examples/default-example/default-example.component.html?raw';
import defaultExampleTs from '!./examples/default-example/default-example.component.ts?raw';

import diExampleHtml from '!./examples/di-example/di-example.component.html?raw';
import diExampleTs from '!./examples/di-example/di-example.component.ts?raw';
import diRecipientExampleTs from '!./examples/di-example/fn-disabled-recipient.directive.ts?raw';

@Component({
    selector: 'app-tabs',
    templateUrl: './fn-disabled-docs.component.html',
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
    diExample: ExampleFile[] = [
        {
            code: diExampleHtml,
            language: 'html',
            fileName: 'fn-disabled-di-example',
            component: 'FnDisabledDIExample'
        },
        {
            code: diExampleTs,
            language: 'ts',
            fileName: 'fn-disabled-di-example',
            component: 'FnDisabledDIExample'
        },
        {
            code: diRecipientExampleTs,
            language: 'ts',
            fileName: 'fn-disabled-recipient.directive',
            component: 'FnDisabledRecipientDirective'
        }
    ];

    constructor() {}
}
