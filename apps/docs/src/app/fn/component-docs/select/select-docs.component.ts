import { Component, ViewEncapsulation } from '@angular/core';

import selectrc from '!./examples/select-example/select-example.component.html?raw';
import selectSemanticrc from '!./examples/select-example/select-semantic-example.component.html?raw';
import selectFormsrc from '!./examples/select-example/select-forms-example.component.html?raw';
import selectEditablerc from '!./examples/select-example/select-editable-example.component.html?raw';

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
    selectSemanticExample: ExampleFile[] = [
        {
            language: 'html',
            code: selectSemanticrc,
            fileName: 'select-semantic-example'
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
