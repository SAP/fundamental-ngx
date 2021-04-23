import { Component } from '@angular/core';

import * as textBasicHtml from '!raw-loader!./examples/text-basic.component.html';
import * as textWhitespacesHtml from '!raw-loader!./examples/text-whitespaces.component.html';
import * as textWhitespacesTs from '!raw-loader!./examples/text-whitespaces.component.ts';
import * as textMaxLinesHtml from '!raw-loader!./examples/text-max-lines.component.html';
import * as textMaxLinesTs from '!raw-loader!./examples/text-max-lines.component.ts';
import * as textHyphenationHtml from '!raw-loader!./examples/text-hyphenation.component.html';
import * as textHyphenationTs from '!raw-loader!./examples/text-hyphenation.component.ts';
import * as textHyphenationScss from '!raw-loader!./examples/text-hyphenation.component.scss';
import * as textExpandableHtml from '!raw-loader!./examples/text-expandable.component.html';
import * as textExpandableTs from '!raw-loader!./examples/text-expandable.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './text-docs.component.html'
})
export class TextDocsComponent {
    textBasic: ExampleFile[] = [
        {
            language: 'html',
            code: textBasicHtml,
            fileName: 'text-basic'
        }
    ];

    textWhitespaces: ExampleFile[] = [
        {
            language: 'html',
            code: textWhitespacesHtml,
            fileName: 'text-whitespaces'
        },
        {
            language: 'typescript',
            code: textWhitespacesTs,
            component: 'TextWhitespacesComponent',
            fileName: 'text-whitespaces'
        }
    ];

    textMaxLines: ExampleFile[] = [
        {
            language: 'html',
            code: textMaxLinesHtml,
            fileName: 'text-max-lines'
        },
        {
            language: 'typescript',
            code: textMaxLinesTs,
            component: 'TextMaxLinesComponent',
            fileName: 'text-max-lines'
        }
    ];

    textHyphenation: ExampleFile[] = [
        {
            language: 'html',
            code: textHyphenationHtml,
            fileName: 'text-hyphenation',
            scssFileCode: textHyphenationScss
        },
        {
            language: 'typescript',
            code: textHyphenationTs,
            component: 'TextHyphenationComponent',
            fileName: 'text-hyphenation'
        }
    ];

    textExpandable: ExampleFile[] = [
        {
            language: 'html',
            code: textExpandableHtml,
            fileName: 'text-expandable'
        },
        {
            language: 'typescript',
            code: textExpandableTs,
            component: 'TextExpandableComponent',
            fileName: 'text-expandable'
        }
    ];
}
