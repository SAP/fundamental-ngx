import { Component } from '@angular/core';
import * as platformInputDefaultTypesSrc from '!raw-loader!./platform-input-example/platform-input-example.component.html';
import * as platformInputDefaultTypesTsSrc from '!raw-loader!./platform-input-example/platform-input-example.component.ts';

import * as platformInputReactiveFormValidationTypesSrc from '!raw-loader!./platform-input-example/platform-input-reactive-validation-example.component.html';
import * as platformInputReactiveFormValidationTypesTsSrc from '!raw-loader!./platform-input-example/platform-input-reactive-validation-example.component.ts';

import * as platformInputAutoCompleteFormValidationTypesSrc from '!raw-loader!./platform-input-example/platform-input-auto-complete-validation-example.component.html';
import * as platformInputAutoCompleteFormValidationTypesTsSrc from '!raw-loader!./platform-input-example/platform-input-auto-complete-validation-example.component.ts';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

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
            component: 'PlatformInputDefaultExampleComponent'
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
            component: 'PlatformInputAutoCompleteValidationExampleComponent'
        }
    ];
}
