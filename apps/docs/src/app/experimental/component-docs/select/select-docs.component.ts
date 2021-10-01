import { Component, ViewEncapsulation } from '@angular/core';

import * as selectrc from '!raw-loader!./examples/select-example/select-example.component.html';

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
}
