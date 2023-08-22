import { Component } from '@angular/core';

import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { ActionSheetMobileExampleComponent } from './examples/action-sheet-mobile/action-sheet-mobile-example.component';
import { ActionSheetCompactExampleComponent } from './examples/action-sheet-compact/action-sheet-compact-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ActionSheetDefaultExampleComponent } from './examples/action-sheet-default/action-sheet-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-action-sheet',
    templateUrl: './action-sheet-docs.component.html',
    standalone: true,
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
