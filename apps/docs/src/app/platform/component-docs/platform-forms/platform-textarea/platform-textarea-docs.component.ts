import { Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import platformBasicTextareaSrc from '!./platform-textarea-examples/platform-textarea-basic-example.component.html?raw';
import platformBasicTextareaTsCode from '!./platform-textarea-examples/platform-textarea-basic-example.component.ts?raw';

import platformCounterTextareaSrc from '!./platform-textarea-examples/platform-textarea-counter-example.component.html?raw';
import platformCounterTextareaTsCode from '!./platform-textarea-examples/platform-textarea-counter-example.component.ts?raw';
import platformTemplateCounterTextareaSrc from '!./platform-textarea-examples/platform-textarea-counter-template-example.component.html?raw';
import platformTemplateCounterTextareaTsCode from '!./platform-textarea-examples/platform-textarea-counter-template-example.component.ts?raw';

import platformAutogrowTextareaSrc from '!./platform-textarea-examples/platform-textarea-autogrow-example.component.html?raw';
import platformAutogrowTextareaTsCode from '!./platform-textarea-examples/platform-textarea-autogrow-example.component.ts?raw';

@Component({
    selector: 'app-textarea',
    templateUrl: './platform-textarea-docs.component.html'
})
export class PlatformTextareaDocsComponent {
    textareaBasic: ExampleFile[] = [
        {
            language: 'html',
            code: platformBasicTextareaSrc,
            fileName: 'platform-textarea-basic-example'
        },
        {
            language: 'typescript',
            code: platformBasicTextareaTsCode,
            fileName: 'platform-textarea-basic-example',
            component: 'PlatformTextareaBasicExampleComponent'
        }
    ];

    textareaCounter: ExampleFile[] = [
        {
            language: 'html',
            code: platformCounterTextareaSrc,
            fileName: 'platform-textarea-counter-example'
        },
        {
            language: 'typescript',
            code: platformCounterTextareaTsCode,
            fileName: 'platform-textarea-counter-example',
            component: 'PlatformTextareaCounterExampleComponent'
        }
    ];

    textareaTemplateCounter: ExampleFile[] = [
        {
            language: 'html',
            code: platformTemplateCounterTextareaSrc,
            fileName: 'platform-textarea-counter-template-example'
        },
        {
            language: 'typescript',
            code: platformTemplateCounterTextareaTsCode,
            fileName: 'platform-textarea-counter-template-example',
            component: 'PlatformTextareaCounterTemplateExampleComponent'
        }
    ];

    textareaAutogrow: ExampleFile[] = [
        {
            language: 'html',
            code: platformAutogrowTextareaSrc,
            fileName: 'platform-textarea-autogrow-example'
        },
        {
            language: 'typescript',
            code: platformAutogrowTextareaTsCode,
            fileName: 'platform-textarea-autogrow-example',
            component: 'PlatformTextareaAutogrowExampleComponent'
        }
    ];
}
