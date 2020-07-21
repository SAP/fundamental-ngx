import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as numberStepInputExampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-example.component.html';
import * as numberStepInputExampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-example.component.ts';

@Component({
    selector: 'app-step-input',
    templateUrl: './platform-step-input-docs.component.html'
})
export class PlatformStepInputDocsComponent {
    numberStepInput: ExampleFile[] = [
        {
            language: 'html',
            code: numberStepInputExampleHtml,
            fileName: 'platform-number-step-input-example'
        },
        {
            language: 'ts',
            code: numberStepInputExampleTs,
            fileName: 'platform-number-step-input-example'
        }
    ];
}
