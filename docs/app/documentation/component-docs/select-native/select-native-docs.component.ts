import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/select-native-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/select-native-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/select-native-state-example.component.html';
import * as formGroupSelectHtml from '!raw-loader!./examples/select-native-form-group-example.component.html';
import * as formGroupSelectTs from '!raw-loader!./examples/select-native-form-group-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-select',
    templateUrl: './select-native-docs.component.html'
})
export class SelectNativeDocsComponent {


    selectFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
        }
    ];

    selectHelpFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml,
        }
    ];

    selectStatesFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml,
        }
    ];

    formGroupSelect: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupSelectHtml,
        },
        {
            language: 'typescript',
            code: formGroupSelectTs,
        }
    ];
}
