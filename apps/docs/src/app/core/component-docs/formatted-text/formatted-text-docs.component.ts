import { Component } from '@angular/core';

import formattedTextHtml from '!./examples/base/formatted-text-example.component.html?raw';
import formattedTextTs from '!./examples/base/formatted-text-example.component.ts?raw';

import linkFormattedTextHtml from '!./examples/links/formatted-text-links-example.component.html?raw';
import linkFormattedTextTs from '!./examples/links/formatted-text-links-example.component.ts?raw';

import scriptFormattedTextHtml from '!./examples/script/formatted-text-script-example.component.html?raw';
import scriptFormattedTextTs from '!./examples/script/formatted-text-script-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './formatted-text-docs.component.html'
})
export class FormattedTextDocsComponent {
    formattedTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: formattedTextHtml,
            fileName: 'formatted-text-example'
        },
        {
            language: 'typescript',
            code: formattedTextTs,
            fileName: 'formatted-text-example',
            component: 'FormattedTextExampleComponent'
        }
    ];

    linkFormattedTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: linkFormattedTextHtml,
            fileName: 'formatted-text-links-example'
        },
        {
            language: 'typescript',
            code: linkFormattedTextTs,
            fileName: 'formatted-text-links-example',
            component: 'FormattedTextLinksExampleComponent'
        }
    ];

    scriptFormattedTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: scriptFormattedTextHtml,
            fileName: 'formatted-text-script-example'
        },
        {
            language: 'typescript',
            code: scriptFormattedTextTs,
            fileName: 'formatted-text-script-example',
            component: 'FormattedTextScriptExampleComponent'
        }
    ];
}
