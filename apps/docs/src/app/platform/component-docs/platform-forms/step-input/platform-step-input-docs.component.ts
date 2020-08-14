import { Component, ViewEncapsulation } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import * as exampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-example.component.html';
import * as exampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-example.component.ts';
import * as reactiveFormExampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-reactive-example.component.html';
import * as reactiveFormExampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-reactive-example.component.ts';
import * as templateFormExampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-template-example.component.html';
import * as templateFormExampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-template-example.component.ts';

@Component({
    selector: 'app-step-input',
    templateUrl: './platform-step-input-docs.component.html',
    styleUrls: ['./platform-step-input-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformStepInputDocsComponent {
    numberStepInput: ExampleFile[] = [
        {
            language: 'html',
            code: exampleHtml,
            fileName: 'platform-number-step-input-example'
        },
        {
            language: 'typescript',
            code: exampleTs,
            fileName: 'platform-number-step-input-example'
        }
    ];

    numberStepInputForm: ExampleFile[] = [
        {
            language: 'html',
            code: reactiveFormExampleHtml,
            fileName: 'platform-number-step-input-form-example'
        },
        {
            language: 'typescript',
            code: reactiveFormExampleTs,
            fileName: 'platform-number-step-input-form-example'
        }
    ];

    numberStepInputTemplateForm: ExampleFile[] = [
        {
            language: 'html',
            code: templateFormExampleHtml,
            fileName: 'platform-number-step-input-template-form-example'
        },
        {
            language: 'typescript',
            code: templateFormExampleTs,
            fileName: 'platform-number-step-input-template-form-example'
        }
    ];
}
