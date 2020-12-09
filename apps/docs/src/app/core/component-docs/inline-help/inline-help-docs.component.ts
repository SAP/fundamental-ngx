import { Component } from '@angular/core';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as inlineHelpSrc from '!raw-loader!./examples/inline-help-example.component.html';
import * as inlineHelpTriggerHtml from '!raw-loader!./examples/inline-help-trigger-example.component.html';
import * as inlineHelpScssCode from '!raw-loader!./examples/inline-help-example.component.scss';
import * as inlineHelpStylesHtml from '!raw-loader!./examples/inline-help-styled-example.component.html';
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
            fileName: 'inline-help-example',
            scssFileCode: inlineHelpScssCode
        }
    ];

    inlineHelpTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpTriggerHtml,
            fileName: 'inline-help-trigger-example'
        }
    ];

    inlineHelpStyles: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpStylesHtml,
            fileName: 'inline-help-styled-example'
        }
    ];
}
