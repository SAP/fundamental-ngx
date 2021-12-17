import { Component } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import platformInputDefaultTypesSrc from '!./platform-input-example/platform-input-example.component.html?raw';
import platformInputDefaultTypesTsSrc from '!./platform-input-example/platform-input-example.component?raw';

import platformInputReactiveFormValidationTypesSrc from '!./platform-input-example/platform-input-reactive-validation-example.component.html?raw';
import platformInputReactiveFormValidationTypesTsSrc from '!./platform-input-example/platform-input-reactive-validation-example.component?raw';

import platformInputAutoCompleteFormValidationTypesSrc from '!./platform-input-example/platform-input-auto-complete-validation-example.component.html?raw';
import platformInputAutoCompleteFormValidationTypesTsSrc from '!./platform-input-example/platform-input-auto-complete-validation-example.component?raw';
import platformInputAutoCompleteFormValidationTypesScssSrc from '!./platform-input-example/platform-input-auto-complete-validation-example.component.scss?raw';

import platformInputReactiveFormMinMaxValidationTypesSrc from '!./platform-input-example/platform-input-reactive-min-max-validation-example.component.html?raw';
import platformInputReactiveFormMinMaxValidationTypesTsSrc from '!./platform-input-example/platform-input-reactive-min-max-validation-example.component?raw';

@Component({
    selector: 'fd-platform-input-docs',
    templateUrl: './platform-input-docs.component.html'
})
export class PlatformInputDocsComponent {
    defaultInputType: ExampleFile[] = [
        {
            language: 'html',
            code: platformInputDefaultTypesSrc,
            fileName: 'platform-input-example'
        },
        {
            language: 'typescript',
            code: platformInputDefaultTypesTsSrc,
            fileName: 'platform-input-example',
            component: 'PlatformInputExampleComponent'
        }
    ];

    inputReactiveFormValidationInputType: ExampleFile[] = [
        {
            language: 'html',
            code: platformInputReactiveFormValidationTypesSrc,
            fileName: 'platform-input-reactive-validation-example'
        },
        {
            language: 'typescript',
            code: platformInputReactiveFormValidationTypesTsSrc,
            fileName: 'platform-input-reactive-validation-example',
            component: 'PlatformInputReactiveValidationExampleComponent'
        }
    ];
    inputAutoCompleteFormValidationInputType: ExampleFile[] = [
        {
            language: 'html',
            code: platformInputAutoCompleteFormValidationTypesSrc,
            fileName: 'platform-input-auto-complete-validation-example'
        },
        {
            language: 'typescript',
            code: platformInputAutoCompleteFormValidationTypesTsSrc,
            fileName: 'platform-input-auto-complete-validation-example',
            component: 'PlatformInputAutoCompleteValidationExampleComponent',
            scssFileCode: platformInputAutoCompleteFormValidationTypesScssSrc
        }
    ];
    inputReactiveFormMinMaxValidationInputType: ExampleFile[] = [
        {
            language: 'html',
            code: platformInputReactiveFormMinMaxValidationTypesSrc,
            fileName: 'platform-input-reactive-min-max-validation-example'
        },
        {
            language: 'typescript',
            code: platformInputReactiveFormMinMaxValidationTypesTsSrc,
            fileName: 'platform-input-reactive-min-max-validation-example',
            component: 'PlatformInputReactiveMinMaxValidationExampleComponent'
        }
    ];
}
