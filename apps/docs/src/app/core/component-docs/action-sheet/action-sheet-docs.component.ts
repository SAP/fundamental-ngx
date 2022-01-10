import { Component } from '@angular/core';

import actionSheetCompactSrc from '!./examples/action-sheet-compact/action-sheet-compact-example.component.html?raw';
import actionSheetCompactSrcTs from '!./examples/action-sheet-compact/action-sheet-compact-example.component.ts?raw';
import actionSheetDefaultSrc from '!./examples/action-sheet-default/action-sheet-default-example.component.html?raw';
import actionSheetDefaultSrcTs from '!./examples/action-sheet-default/action-sheet-default-example.component.ts?raw';
import actionSheetMobileSrc from '!./examples/action-sheet-mobile/action-sheet-mobile-example.component.html?raw';
import actionSheetMobileSrcTs from '!./examples/action-sheet-mobile/action-sheet-mobile-example.component.ts?raw';
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
            fileName: 'action-sheet-compact-example'
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
            fileName: 'action-sheet-default-example'
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
            fileName: 'action-sheet-mobile-example'
        },
        {
            language: 'typescript',
            code: actionSheetMobileSrcTs,
            fileName: 'action-sheet-mobile-example',
            component: 'ActionSheetMobileExampleComponent'
        }
    ];
}
