import { Component } from '@angular/core';

import * as formCheckboxHtml from '!raw-loader!./examples/form-checkbox-example.component.html';
import * as formHtml from '!raw-loader!./examples/form-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/form-inline-help-example.component.html';
import * as formRadioHtml from '!raw-loader!./examples/form-radio-example.component.html';
import * as formSelectHtml from '!raw-loader!./examples/form-select-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/form-state-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/form-group-input-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/form-group-input-example.component.ts';

@Component({
    selector: 'app-form',
    templateUrl: './form-docs.component.html'
})
export class FormDocsComponent {
    inputsFormHtml = formHtml;

    inputsHelpFormHtml = formInlineHelpHtml;

    inputStatesFormHtml = formStateHtml;

    selectFormHtml = formSelectHtml;

    radioButtonsFormHtml = formRadioHtml;

    checkboxFormHtml = formCheckboxHtml;

    formGroupInputHtml = formGroupInputHtml;

    formGroupInputTs = formGroupInputTs;
}
