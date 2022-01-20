import { Component } from '@angular/core';

import textBasicHtml from '!./examples/text-basic.component.html?raw';
import textWhitespacesHtml from '!./examples/text-whitespaces.component.html?raw';
import textWhitespacesTs from '!./examples/text-whitespaces.component.ts?raw';
import textMaxLinesHtml from '!./examples/text-max-lines.component.html?raw';
import textMaxLinesTs from '!./examples/text-max-lines.component.ts?raw';
import textHyphenationHtml from '!./examples/text-hyphenation.component.html?raw';
import textHyphenationTs from '!./examples/text-hyphenation.component.ts?raw';
import textHyphenationScss from '!./examples/text-hyphenation.component.scss?raw';
import textExpandableHtml from '!./examples/text-expandable.component.html?raw';
import textExpandableTs from '!./examples/text-expandable.component.ts?raw';
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
