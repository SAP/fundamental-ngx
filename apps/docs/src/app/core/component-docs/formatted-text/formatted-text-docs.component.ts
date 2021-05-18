import { Component } from '@angular/core';

import * as formattedTextHtml from '!raw-loader!./examples/base/formatted-text-example.component.html';
import * as formattedTextTs from '!raw-loader!./examples/base/formatted-text-example.component.ts';

import * as linkFormattedTextHtml from '!raw-loader!./examples/links/formatted-text-links-example.component.html';
import * as linkFormattedTextTs from '!raw-loader!./examples/links/formatted-text-links-example.component.ts';

import * as scriptFormattedTextHtml from '!raw-loader!./examples/script/formatted-text-script-example.component.html';
import * as scriptFormattedTextTs from '!raw-loader!./examples/script/formatted-text-script-example.component.ts';

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
