import { Component } from '@angular/core';

import formHtml from '!./examples/textarea-example.component.html?raw';
import formInlineHelpHtml from '!./examples/textarea-inline-help-example.component.html?raw';
import formStateHtml from '!./examples/textarea-state-example.component.html?raw';
import formGroupInputHtml from '!./examples/textarea-form-group-example.component.html?raw';
import formGroupInputScss from '!./examples/textarea-form-group-example.component.scss?raw';
import formGroupInputTs from '!./examples/textarea-form-group-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './textarea-docs.component.html'
})
export class TextareaDocsComponent {
    textareaHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
            fileName: 'textarea-example'
        }
    ];

    textareaHelpHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml,
            fileName: 'textarea-inline-help-example'
        }
    ];

    textareaStatesHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml,
            fileName: 'textarea-state-example'
        }
    ];

    textareaFormGroup: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml,
            fileName: 'textarea-form-group-example',
            scssFileCode: formGroupInputScss
        },
        {
            language: 'typescript',
            code: formGroupInputTs,
            fileName: 'textarea-form-group-example',
            component: 'TextareaFormGroupExampleComponent'
        }
    ];
}
