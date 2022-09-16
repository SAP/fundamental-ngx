import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const defaultExampleTs = 'scrollbar-example.component.ts';
const noHorizontalScrollExampleTs = 'scrollbar-no-horizontal-example.component.ts';
const noVerticalScrollExampleTs = 'scrollbar-no-vertical-example.component.ts';

@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar-docs.component.html'
})
export class ScrollbarDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(defaultExampleTs),
            fileName: 'scrollbar-example',
            component: 'ScrollbarExampleComponent'
        }
    ];

    noHorizontalExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(noHorizontalScrollExampleTs),
            fileName: 'scrollbar-no-horizontal-example',
            component: 'ScrollbarNoHorizontalExampleComponent'
        }
    ];

    noVerticalExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(noVerticalScrollExampleTs),
            fileName: 'scrollbar-no-vertical-example',
            component: 'ScrollbarNoVerticalExampleComponent'
        }
    ];
}
