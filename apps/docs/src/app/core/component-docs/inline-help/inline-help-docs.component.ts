import { Component } from '@angular/core';

import * as inlineHelpTs from '!raw-loader!./examples/inline-help-example.component.ts';
import * as inlineHelpSrc from '!raw-loader!./examples/inline-help-example.component.html';
import * as inlineHelpTriggerHtml from '!raw-loader!./examples/inline-help-trigger-example.component.html';
import * as inlineHelpStylesTs from '!raw-loader!./examples/inline-help-styled-example.component.ts';
import * as inlineHelpStylesHtml from '!raw-loader!./examples/inline-help-styled-example.component.html';
import * as inlineHelpTemplateHtml from '!raw-loader!./examples/inline-help-template-example/inline-help-template-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-inline-help',
    templateUrl: './inline-help-docs.component.html'
})
export class InlineHelpDocsComponent {
    inlineHelpBasic: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpSrc,
            fileName: 'inline-help-example'
        },
        {
            language: 'typescript',
            code: inlineHelpTs,
            fileName: 'inline-help-example',
            component: 'InlineHelpExampleComponent'
        }
    ];

    inlineHelpTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpTriggerHtml,
            fileName: 'inline-help-trigger-example'
        }
    ];

    inlineHelpTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpTemplateHtml,
            fileName: 'inline-help-template-example'
        }
    ];

    inlineHelpStyles: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpStylesHtml,
            fileName: 'inline-help-styled-example'
        },
        {
            language: 'typescript',
            code: inlineHelpStylesTs,
            fileName: 'inline-help-styled-example',
            component: 'InlineHelpStyledExampleComponent'
        }
    ];
}
