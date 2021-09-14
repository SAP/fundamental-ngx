import { Component } from '@angular/core';
import * as defaultFormGeneratorhtml from '!raw-loader!./platform-form-generator-examples/platform-form-generator-example.component.html';
import * as defaultFormGeneratorSrc from '!raw-loader!./platform-form-generator-examples/platform-form-generator-example.component.ts';

import * as defaultObservableFormGeneratorhtml from '!raw-loader!./platform-form-generator-examples/platform-form-generator-observable-example.component.html';
import * as defaultObservableFormGeneratorSrc from '!raw-loader!./platform-form-generator-examples/platform-form-generator-observable-example.component.ts';

import * as customFormGeneratorhtml from '!raw-loader!./platform-form-generator-examples/platform-form-generator-custom-component-example.component.html';
import * as customFormGeneratorSrc from '!raw-loader!./platform-form-generator-examples/platform-form-generator-custom-component-example.component.ts';

import * as programaticSubmitHtml from '!raw-loader!./platform-form-generator-examples/platform-form-generator-programatic-submit.component.html';
import * as programaticSubmitSrc from '!raw-loader!./platform-form-generator-examples/platform-form-generator-programatic-submit.component.ts';

import * as customErrorsHtml from '!raw-loader!./platform-form-generator-examples/platform-form-generator-custom-error-example.component.html';
import * as customErrorsSrc from '!raw-loader!./platform-form-generator-examples/platform-form-generator-custom-error-example.component.ts';

import * as formFieldLayoutGeneratorhtml from '!raw-loader!./platform-form-generator-examples/platform-form-generator-field-layout-example.component.html';
import * as formFieldLayoutGeneratorSrc from '!raw-loader!./platform-form-generator-examples/platform-form-generator-field-layout-example.component.ts';

import * as noColonsForLabelHtml from '!raw-loader!./platform-form-generator-examples/platform-form-generator-no-colons-example.component.html';
import * as noColonsForLabelSrc from '!raw-loader!./platform-form-generator-examples/platform-form-generator-no-colons-example.component.ts';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-form-generator',
    templateUrl: 'platform-form-generator-docs.component.html'
})
export class PlatformFormGeneratorDocsComponent {
    defaultFormGenerator: ExampleFile[] = [
        {
            language: 'html',
            code: defaultFormGeneratorhtml,
            fileName: 'platform-form-generator-example'
        },
        {
            language: 'typescript',
            code: defaultFormGeneratorSrc,
            fileName: 'platform-form-generator-example',
            component: 'PlatformFormGeneratorExampleComponent'
        }
    ];

    defaultObservableFormGenerator: ExampleFile[] = [
        {
            language: 'html',
            code: defaultObservableFormGeneratorhtml,
            fileName: 'platform-form-generator-observable-example'
        },
        {
            language: 'typescript',
            code: defaultObservableFormGeneratorSrc,
            fileName: 'platform-form-generator-observable-example',
            component: 'PlatformFormGeneratorObservableExampleComponent'
        }
    ];

    customFormGenerator: ExampleFile[] = [
        {
            language: 'html',
            code: customFormGeneratorhtml,
            fileName: 'platform-form-generator-custom-component-example'
        },
        {
            language: 'typescript',
            code: customFormGeneratorSrc,
            fileName: 'platform-form-generator-custom-component-example',
            component: 'PlatformFormGeneratorCustomComponentExampleComponent'
        }
    ];

    programaticSubmit: ExampleFile[] = [
        {
            language: 'html',
            code: programaticSubmitHtml,
            fileName: 'platform-form-generator-programatic-submit'
        },
        {
            language: 'typescript',
            code: programaticSubmitSrc,
            fileName: 'platform-form-generator-programatic-submit',
            component: 'PlatformFormGeneratorProgramaticSubmitComponent'
        }
    ];

    customErrors: ExampleFile[] = [
        {
            language: 'html',
            code: customErrorsHtml,
            fileName: 'platform-form-generator-custom-error-example'
        },
        {
            language: 'typescript',
            code: customErrorsSrc,
            fileName: 'platform-form-generator-custom-error-example',
            component: 'PlatformFormGeneratorCustomErrorExampleComponent'
        }
    ];

    formFieldLayoutGenerator: ExampleFile[] = [
        {
            language: 'html',
            code: formFieldLayoutGeneratorhtml,
            fileName: 'platform-form-generator-field-layout-example'
        },
        {
            language: 'typescript',
            code: formFieldLayoutGeneratorSrc,
            fileName: 'platform-form-generator-field-layout-example',
            component: 'PlatformFormGeneratorFieldLayoutExampleComponent'
        }
    ];

    noLabelColonsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: noColonsForLabelHtml,
            fileName: 'platform-form-generator-no-colons-example'
        },
        {
            language: 'typescript',
            code: noColonsForLabelSrc,
            fileName: 'platform-form-generator-no-colons-example',
            component: 'PlatformFormGeneratorNoColonsExampleComponent'
        }
    ];
}
