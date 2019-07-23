import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/textarea-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/textarea-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/textarea-state-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/textarea-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/textarea-form-group-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './textarea-docs.component.html'
})
export class TextareaDocsComponent {

    inputsFormHtml = formHtml;

    inputsHelpFormHtml = formInlineHelpHtml;

    inputStatesFormHtml = formStateHtml;

    formGroupInputHtml = formGroupInputHtml;

    formGroupInputTs = formGroupInputTs;
}
