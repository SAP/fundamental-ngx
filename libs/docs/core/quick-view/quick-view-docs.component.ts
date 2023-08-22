import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { QuickViewDialogExampleComponent } from './examples/quick-view-dialog-example.component';
import { QuickViewPopoverExampleComponent } from './examples/quick-view-popover-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { QuickViewBaseExampleComponent } from './examples/quick-view-base-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const baseQuickViewH = 'quick-view-base-example.component.html';
const baseQuickViewTs = 'quick-view-base-example.component.ts';
const popoverQuickViewH = 'quick-view-popover-example.component.html';
const popoverQuickViewTs = 'quick-view-popover-example.component.ts';
const dialogQuickViewH = 'quick-view-dialog-example.component.html';
const dialogQuickViewTs = 'quick-view-dialog-example.component.ts';

@Component({
    selector: 'app-quick-view',
    templateUrl: './quick-view-docs.component.html',
    standalone: true,
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
