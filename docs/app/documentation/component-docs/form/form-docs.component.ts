import { Component } from '@angular/core';

import * as formCheckboxHtml from '!raw-loader!./examples/form-checkbox-example.component.html';
import * as formHtml from '!raw-loader!./examples/form-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/form-inline-help-example.component.html';
import * as formRadioHtml from '!raw-loader!./examples/form-radio-example.component.html';
import * as formSelectHtml from '!raw-loader!./examples/form-select-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/form-state-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/form-group-input-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/form-group-input-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-form',
    templateUrl: './form-docs.component.html'
})
export class FormDocsComponent {

    inputsForm: ExampleFile[] = [{
        language: 'html',
        code: formHtml
    }];

    inputsHelpForm: ExampleFile[] = [{
        language: 'html',
        code: formInlineHelpHtml
    }];

    inputStatesForm: ExampleFile[] = [{
        language: 'html',
        code: formStateHtml
    }];

    selectForm: ExampleFile[] = [{
        language: 'html',
        code: formSelectHtml
    }];

    radioButtonsForm: ExampleFile[] = [{
        language: 'html',
        code: formRadioHtml
    }];

    checkboxForm: ExampleFile[] = [{
        language: 'html',
        code: formCheckboxHtml
    }];

    formGroupInput: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml
        },
        {
            language: 'typescript',
            code: formGroupInputTs
        }
    ];

}
