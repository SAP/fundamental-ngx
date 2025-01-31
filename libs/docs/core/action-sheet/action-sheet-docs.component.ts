import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { ActionSheetCompactExampleComponent } from './examples/action-sheet-compact/action-sheet-compact-example.component';
import { ActionSheetDefaultExampleComponent } from './examples/action-sheet-default/action-sheet-default-example.component';
import { ActionSheetMobileExampleComponent } from './examples/action-sheet-mobile/action-sheet-mobile-example.component';

@Component({
    selector: 'app-action-sheet',
    templateUrl: './action-sheet-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        ActionSheetDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ActionSheetCompactExampleComponent,
        ActionSheetMobileExampleComponent
    ]
})
export class ActionSheetDocsComponent {
    actionSheetCompactExample: ExampleFile[] = [
        getExampleFile('action-sheet-compact/action-sheet-compact-example.component.html'),
        getExampleFile('action-sheet-compact/action-sheet-compact-example.component.ts', {
            component: 'ActionSheetCompactExampleComponent',
            selector: 'action-sheet-compact-example'
        })
    ];

    actionSheetDefaultExample: ExampleFile[] = [
        getExampleFile('action-sheet-default/action-sheet-default-example.component.html'),
        getExampleFile('action-sheet-default/action-sheet-default-example.component.ts', {
            component: 'ActionSheetDefaultExampleComponent',
            selector: 'action-sheet-default-example'
        })
    ];

    actionSheetMobileExample: ExampleFile[] = [
        getExampleFile('action-sheet-mobile/action-sheet-mobile-example.component.html'),
        getExampleFile('action-sheet-mobile/action-sheet-mobile-example.component.ts', {
            component: 'ActionSheetMobileExampleComponent',
            selector: 'action-sheet-mobile-example'
        })
    ];
}
