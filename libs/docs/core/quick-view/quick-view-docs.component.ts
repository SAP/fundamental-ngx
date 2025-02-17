import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { QuickViewBaseExampleComponent } from './examples/quick-view-base-example.component';
import { QuickViewDialogExampleComponent } from './examples/quick-view-dialog-example.component';
import { QuickViewPopoverExampleComponent } from './examples/quick-view-popover-example.component';

const baseQuickViewH = 'quick-view-base-example.component.html';
const baseQuickViewTs = 'quick-view-base-example.component.ts';
const popoverQuickViewH = 'quick-view-popover-example.component.html';
const popoverQuickViewTs = 'quick-view-popover-example.component.ts';
const dialogQuickViewH = 'quick-view-dialog-example.component.html';
const dialogQuickViewTs = 'quick-view-dialog-example.component.ts';

@Component({
    selector: 'app-quick-view',
    templateUrl: './quick-view-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        QuickViewBaseExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        QuickViewPopoverExampleComponent,
        QuickViewDialogExampleComponent
    ]
})
export class QuickViewDocsComponent {
    quickViewBaseExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(baseQuickViewH),
            fileName: 'quick-view-base-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(baseQuickViewTs),
            fileName: 'quick-view-base-example',
            component: 'QuickViewBaseExampleComponent'
        }
    ];

    quickViewPopoverExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverQuickViewH),
            fileName: 'quick-view-popover-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(popoverQuickViewTs),
            fileName: 'quick-view-popover-example',
            component: 'QuickViewPopoverExampleComponent'
        }
    ];

    quickViewDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dialogQuickViewH),
            fileName: 'quick-view-dialog-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dialogQuickViewTs),
            fileName: 'quick-view-dialog-example',
            component: 'QuickViewDialogExampleComponent'
        }
    ];
}
