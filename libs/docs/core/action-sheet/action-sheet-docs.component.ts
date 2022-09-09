import { Component } from '@angular/core';

import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-action-sheet',
    templateUrl: './action-sheet-docs.component.html'
})
export class ActionSheetDocsComponent {
    actionSheetCompactExample: ExampleFile[] = [
        getExampleFile('action-sheet-compact/action-sheet-compact-example.component.html'),
        getExampleFile('action-sheet-compact/action-sheet-compact-example.component.ts', {
            component: 'ActionSheetCompactExampleComponent'
        })
    ];

    actionSheetDefaultExample: ExampleFile[] = [
        getExampleFile('action-sheet-default/action-sheet-default-example.component.html'),
        getExampleFile('action-sheet-default/action-sheet-default-example.component.ts', {
            component: 'ActionSheetDefaultExampleComponent'
        })
    ];

    actionSheetMobileExample: ExampleFile[] = [
        getExampleFile('action-sheet-mobile/action-sheet-mobile-example.component.html'),
        getExampleFile('action-sheet-mobile/action-sheet-mobile-example.component.ts', {
            component: 'ActionSheetMobileExampleComponent'
        })
    ];
}
