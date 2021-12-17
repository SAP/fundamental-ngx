import { Component } from '@angular/core';

import inlineHelpTs from '!./examples/inline-help-example.component.ts?raw';
import inlineHelpSrc from '!./examples/inline-help-example.component.html?raw';
import inlineHelpTriggerHtml from '!./examples/inline-help-trigger-example.component.html?raw';
import inlineHelpStylesTs from '!./examples/inline-help-styled-example.component.ts?raw';
import inlineHelpStylesHtml from '!./examples/inline-help-styled-example.component.html?raw';
import inlineHelpTemplateHtml from '!./examples/inline-help-template-example/inline-help-template-example.component.html?raw';
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
