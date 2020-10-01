import { Component } from '@angular/core';

import * as actionSheetCompactExample from '!raw-loader!./examples/action-sheet-compact-example.component.html';
import * as actionSheetCozyExample from '!raw-loader!./examples/action-sheet-cozy-example.component.html';
import * as actionSheetMobileExample from '!raw-loader!./examples/action-sheet-mobile-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-action-sheet',
    templateUrl: './action-sheet-docs.component.html'
})
export class ActionSheetDocsComponent {
    actionSheetCompactHtml: ExampleFile[] = [
        {
            language: 'html',
            code: actionSheetCompactExample,
            fileName: 'fd-action-sheet-compact-example'
        }
    ];

    actionSheetCozyHtml: ExampleFile[] = [
        {
            language: 'html',
            code: actionSheetCozyExample,
            fileName: 'fd-action-sheet-cozy-example'
        }
    ];

    actionSheetMobileHtml: ExampleFile[] = [
        {
            language: 'html',
            code: actionSheetMobileExample,
            fileName: 'fd-action-sheet-mobile-example'
        }
    ];
}
