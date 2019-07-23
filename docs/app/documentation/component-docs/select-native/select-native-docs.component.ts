import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/select-native-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/select-native-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/select-native-state-example.component.html';
import * as formGroupSelectHtml from '!raw-loader!./examples/select-native-form-group-example.component.html';
import * as formGroupSelectTs from '!raw-loader!./examples/select-native-form-group-example.component.ts';

@Component({
    selector: 'app-select',
    templateUrl: './select-native-docs.component.html'
})
export class SelectNativeDocsComponent {

    selectFormHtml = formHtml;

    selectHelpFormHtml = formInlineHelpHtml;

    selectStatesFormHtml = formStateHtml;

    formGroupSelectHtml = formGroupSelectHtml;

    formGroupSelectTs = formGroupSelectTs;
}
