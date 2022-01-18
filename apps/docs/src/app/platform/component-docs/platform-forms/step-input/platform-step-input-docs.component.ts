import { Component, ViewEncapsulation } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import exampleScss from '!./platform-step-input-examples/platform-step-input-example.scss?raw';
import exampleHtml from '!./platform-step-input-examples/platform-number-step-input-example.component.html?raw';
import exampleTs from '!./platform-step-input-examples/platform-number-step-input-example.component?raw';
import reactiveFormExampleHtml from '!./platform-step-input-examples/platform-number-step-input-reactive-example.component.html?raw';
import reactiveFormExampleTs from '!./platform-step-input-examples/platform-number-step-input-reactive-example.component?raw';
import templateFormExampleHtml from '!./platform-step-input-examples/platform-number-step-input-template-example.component.html?raw';
import templateFormExampleTs from '!./platform-step-input-examples/platform-number-step-input-template-example.component?raw';
import statesExampleHtml from '!./platform-step-input-examples/platform-number-step-input-state-example.component.html?raw';
import statesExampleTs from '!./platform-step-input-examples/platform-number-step-input-state-example.component?raw';

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
