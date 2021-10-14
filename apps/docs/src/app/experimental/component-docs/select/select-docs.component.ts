import { Component, ViewEncapsulation } from '@angular/core';

import * as selectrc from '!raw-loader!./examples/select-example/select-example.component.html';
import * as selectFormsrc from '!raw-loader!./examples/select-example/select-forms-example.component.html';
import * as selectEditablerc from '!raw-loader!./examples/select-example/select-editable-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-select',
    templateUrl: './select-docs.component.html',
    styleUrls: ['select-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectDocsComponent {
    selectExample: ExampleFile[] = [
        {
            language: 'html',
            code: selectrc,
            fileName: 'select-example'
        }
    ];
    selectFormsExample: ExampleFile[] = [
        {
            language: 'html',
            code: selectFormsrc,
            fileName: 'select-forms-example'
        }
    ];
    selectEditableExample: ExampleFile[] = [
        {
            language: 'html',
            code: selectEditablerc,
            fileName: 'select-editable-example'
        }
    ];
}
