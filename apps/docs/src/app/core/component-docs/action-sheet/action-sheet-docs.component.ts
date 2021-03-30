import { Component } from '@angular/core';

import * as actionSheetCompactSrc from '!raw-loader!./examples/action-sheet-compact/action-sheet-compact-example.component.html';
import * as actionSheetCompactSrcTs from '!raw-loader!./examples/action-sheet-compact/action-sheet-compact-example.component.ts';
import * as actionSheetDefaultSrc from '!raw-loader!./examples/action-sheet-default/action-sheet-default-example.component.html';
import * as actionSheetDefaultSrcTs from '!raw-loader!./examples/action-sheet-default/action-sheet-default-example.component.ts';
import * as actionSheetMobileSrc from '!raw-loader!./examples/action-sheet-mobile/action-sheet-mobile-example.component.html';
import * as actionSheetMobileSrcTs from '!raw-loader!./examples/action-sheet-mobile/action-sheet-mobile-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-action-sheet',
    templateUrl: './action-sheet-docs.component.html'
})
export class ActionSheetDocsComponent {
    actionSheetCompactExample: ExampleFile[] = [
        {
            language: 'html',
            code: actionSheetCompactSrc,
            fileName: 'action-sheet-compact-example',
        },
        {
            language: 'typescript',
            code: actionSheetCompactSrcTs,
            fileName: 'action-sheet-compact-example',
            component: 'ActionSheetCompactExampleComponent'
        }
    ];

    actionSheetDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: actionSheetDefaultSrc,
            fileName: 'action-sheet-default-example',
        },
        {
            language: 'typescript',
            code: actionSheetDefaultSrcTs,
            fileName: 'action-sheet-default-example',
            component: 'ActionSheetDefaultExampleComponent'
        }
    ];

    actionSheetMobileExample: ExampleFile[] = [
        {
            language: 'html',
            code: actionSheetMobileSrc,
            fileName: 'action-sheet-mobile-example',
        },
        {
            language: 'typescript',
            code: actionSheetMobileSrcTs,
            fileName: 'action-sheet-mobile-example',
            component: 'ActionSheetMobileExampleComponent'
        }
    ];
}
