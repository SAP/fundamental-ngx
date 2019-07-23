import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/checkbox-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/checkbox-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/checkbox-form-group-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './checkbox-docs.component.html'
})
export class CheckboxDocsComponent {

    checkboxFormHtml = formHtml;

    formGroupInputHtml = formGroupInputHtml;

    formGroupInputTs = formGroupInputTs;
}
