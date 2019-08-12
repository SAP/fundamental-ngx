import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/checkbox-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/checkbox-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/checkbox-form-group-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './checkbox-docs.component.html'
})
export class CheckboxDocsComponent {

    checkboxFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
        }
    ];

    checkboxFormGroup: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml,
        },
        {
            language: 'typescript',
            code: formGroupInputTs,
        }
    ];

}
