import { Component } from '@angular/core';
import defaultFormGeneratorhtml from '!./platform-form-generator-examples/platform-form-generator-example.component.html?raw';
import defaultFormGeneratorSrc from '!./platform-form-generator-examples/platform-form-generator-example.component.ts?raw';

import defaultObservableFormGeneratorhtml from '!./platform-form-generator-examples/platform-form-generator-observable-example.component.html?raw';
import defaultObservableFormGeneratorSrc from '!./platform-form-generator-examples/platform-form-generator-observable-example.component.ts?raw';

import customFormGeneratorhtml from '!./platform-form-generator-examples/platform-form-generator-custom-component-example.component.html?raw';
import customFormGeneratorSrc from '!./platform-form-generator-examples/platform-form-generator-custom-component-example.component.ts?raw';

import programaticSubmitHtml from '!./platform-form-generator-examples/platform-form-generator-programatic-submit.component.html?raw';
import programaticSubmitSrc from '!./platform-form-generator-examples/platform-form-generator-programatic-submit.component.ts?raw';

import customErrorsHtml from '!./platform-form-generator-examples/platform-form-generator-custom-error-example.component.html?raw';
import customErrorsSrc from '!./platform-form-generator-examples/platform-form-generator-custom-error-example.component.ts?raw';

import formFieldLayoutGeneratorhtml from '!./platform-form-generator-examples/platform-form-generator-field-layout-example.component.html?raw';
import formFieldLayoutGeneratorSrc from '!./platform-form-generator-examples/platform-form-generator-field-layout-example.component.ts?raw';

import noColonsForLabelHtml from '!./platform-form-generator-examples/platform-form-generator-no-colons-example.component.html?raw';
import noColonsForLabelSrc from '!./platform-form-generator-examples/platform-form-generator-no-colons-example.component.ts?raw';

import groupingHtml from '!./platform-form-generator-examples/platform-form-generator-grouping-example.component.html?raw';
import groupingSrc from '!./platform-form-generator-examples/platform-form-generator-grouping-example.component.ts?raw';

import customFieldLayoutHtml from '!./platform-form-generator-examples/platform-form-generator-custom-field-layout-example.component.html?raw';
import customFieldLayoutSrc from '!./platform-form-generator-examples/platform-form-generator-custom-field-layout-example.component.ts?raw';

import inlineHelpHtml from '!./platform-form-generator-examples/platform-form-generator-inline-help-example.component.html?raw';
import inlineHelpSrc from '!./platform-form-generator-examples/platform-form-generator-inline-help-example.component.ts?raw';

import defaultConfigSrc from '!./platform-form-generator-examples/platform-form-generator-global-config-example.ts?raw';

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

    groupingFiles: ExampleFile[] = [
        {
            language: 'html',
            code: groupingHtml,
            fileName: 'platform-form-generator-grouping-example'
        },
        {
            language: 'typescript',
            code: groupingSrc,
            fileName: 'platform-form-generator-grouping-example',
            component: 'PlatformFormGeneratorGroupingExampleComponent'
        }
    ];

    customLayoutFiles: ExampleFile[] = [
        {
            language: 'html',
            code: customFieldLayoutHtml,
            fileName: 'platform-form-generator-custom-field-layout-example'
        },
        {
            language: 'typescript',
            code: customFieldLayoutSrc,
            fileName: 'platform-form-generator-custom-field-layout-example',
            component: 'PlatformFormGeneratorCustomFieldLayoutExampleComponent'
        }
    ];

    inlineHelpFiles: ExampleFile[] = [
        {
            language: 'html',
            code: inlineHelpHtml,
            fileName: 'platform-form-generator-inline-help-example'
        },
        {
            language: 'typescript',
            code: inlineHelpSrc,
            fileName: 'platform-form-generator-inline-help-example',
            component: 'PlatformFormGeneratorInlineHelpExampleComponent'
        }
    ];

    defaultConfigExample = defaultConfigSrc;
}
