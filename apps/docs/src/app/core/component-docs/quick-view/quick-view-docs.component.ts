import { Component } from '@angular/core';

import baseQuickViewH from '!./examples/quick-view-base-example.component.html?raw';
import baseQuickViewTs from '!./examples/quick-view-base-example.component.ts?raw';
import popoverQuickViewH from '!./examples/quick-view-popover-example.component.html?raw';
import popoverQuickViewTs from '!./examples/quick-view-popover-example.component.ts?raw';
import dialogQuickViewH from '!./examples/quick-view-dialog-example.component.html?raw';
import dialogQuickViewTs from '!./examples/quick-view-dialog-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-quick-view',
    templateUrl: './quick-view-docs.component.html'
})
export class QuickViewDocsComponent {
    quickViewBaseExample: ExampleFile[] = [
        {
            language: 'html',
            code: baseQuickViewH,
            fileName: 'quick-view-base-example'
        },
        {
            language: 'typescript',
            code: baseQuickViewTs,
            fileName: 'quick-view-base-example',
            component: 'QuickViewBaseExampleComponent'
        }
    ];

    quickViewPopoverExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverQuickViewH,
            fileName: 'quick-view-popover-example'
        },
        {
            language: 'typescript',
            code: popoverQuickViewTs,
            fileName: 'quick-view-popover-example',
            component: 'QuickViewPopoverExampleComponent'
        }
    ];

    quickViewDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: dialogQuickViewH,
            fileName: 'quick-view-dialog-example'
        },
        {
            language: 'typescript',
            code: dialogQuickViewTs,
            fileName: 'quick-view-dialog-example',
            component: 'QuickViewDialogExampleComponent'
        }
    ];
}
