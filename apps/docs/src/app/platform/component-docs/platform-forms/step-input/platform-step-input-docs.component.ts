import { Component, ViewEncapsulation } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import * as exampleScss from '!raw-loader!./platform-step-input-examples/platform-step-input-example.scss';
import * as exampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-example.component.html';
import * as exampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-example.component';
import * as reactiveFormExampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-reactive-example.component.html';
import * as reactiveFormExampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-reactive-example.component';
import * as templateFormExampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-template-example.component.html';
import * as templateFormExampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-template-example.component';
import * as statesExampleHtml from '!raw-loader!./platform-step-input-examples/platform-number-step-input-state-example.component.html';
import * as statesExampleTs from '!raw-loader!./platform-step-input-examples/platform-number-step-input-state-example.component';

@Component({
    selector: 'app-step-input',
    templateUrl: './platform-step-input-docs.component.html',
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
            fileName: 'platform-number-step-input-example',
            component: 'PlatformNumberStepInputExampleComponent',
            scssFileCode: exampleScss
        }
    ];

    numberStepInputForm: ExampleFile[] = [
        {
            language: 'html',
            code: reactiveFormExampleHtml,
            fileName: 'platform-number-step-input-reactive-example'
        },
        {
            language: 'typescript',
            code: reactiveFormExampleTs,
            fileName: 'platform-number-step-input-reactive-example',
            component: 'PlatformNumberStepInputFormExampleComponent',
            scssFileCode: exampleScss
        }
    ];

    numberStepInputTemplateForm: ExampleFile[] = [
        {
            language: 'html',
            code: templateFormExampleHtml,
            fileName: 'platform-number-step-input-template-example'
        },
        {
            language: 'typescript',
            code: templateFormExampleTs,
            fileName: 'platform-number-step-input-template-example',
            component: 'PlatformNumberStepInputTemplateFormExampleComponent',
            scssFileCode: exampleScss
        }
    ];

    numberStepInputStates: ExampleFile[] = [
        {
            language: 'html',
            code: statesExampleHtml,
            fileName: 'platform-number-step-input-state-example'
        },
        {
            language: 'typescript',
            code: statesExampleTs,
            fileName: 'platform-number-step-input-state-example',
            component: 'PlatformNumberStepInputStateExampleComponent',
            scssFileCode: exampleScss
        }
    ];
}
