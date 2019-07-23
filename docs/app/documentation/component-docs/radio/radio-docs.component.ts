import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/radio-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/radio-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/radio-form-group-example.component.ts';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-docs.component.html'
})
export class RadioDocsComponent {

    checkboxFormHtml = formHtml;

    formGroupInputHtml = formGroupInputHtml;

    formGroupInputTs = formGroupInputTs;
}
