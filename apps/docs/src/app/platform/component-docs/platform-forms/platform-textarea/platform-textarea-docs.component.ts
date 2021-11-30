import { Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import * as platformBasicTextareaSrc from '!raw-loader!./platform-textarea-examples/platform-textarea-basic-example.component.html';
import * as platformBasicTextareaTsCode from '!raw-loader!./platform-textarea-examples/platform-textarea-basic-example.component.ts';

import * as platformCounterTextareaSrc from '!raw-loader!./platform-textarea-examples/platform-textarea-counter-example.component.html';
import * as platformCounterTextareaTsCode from '!raw-loader!./platform-textarea-examples/platform-textarea-counter-example.component.ts';
import * as platformTemplateCounterTextareaSrc from '!raw-loader!./platform-textarea-examples/platform-textarea-counter-template-example.component.html';
import * as platformTemplateCounterTextareaTsCode from '!raw-loader!./platform-textarea-examples/platform-textarea-counter-template-example.component.ts';

import * as platformAutogrowTextareaSrc from '!raw-loader!./platform-textarea-examples/platform-textarea-autogrow-example.component.html';
import * as platformAutogrowTextareaTsCode from '!raw-loader!./platform-textarea-examples/platform-textarea-autogrow-example.component.ts';

import * as platformI18nTextareaSrc from '!raw-loader!./platform-textarea-examples/platform-textarea-i18n-example.component.html';
import * as platformI18nTextareaTsCode from '!raw-loader!./platform-textarea-examples/platform-textarea-i18n-example.component.ts';

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

    textareaI18n: ExampleFile[] = [
        {
            language: 'html',
            code: platformI18nTextareaSrc,
            fileName: 'platform-textarea-i18n-example'
        },
        {
            language: 'typescript',
            code: platformI18nTextareaTsCode,
            fileName: 'platform-textarea-i18n-example',
            component: 'PlatformTextareaI18nExampleComponent'
        }
    ];
}
