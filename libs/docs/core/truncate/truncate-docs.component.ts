import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const truncateTs = 'truncate-example.component.ts';
const truncateTextTs = 'truncate-text-example.component.ts';

@Component({
    selector: 'app-truncate',
    templateUrl: './truncate-docs.component.html'
})
export class TruncateDocsComponent {
    truncate: ExampleFile[] = [
        {
            language: 'TypeScript',
            code: getAssetFromModuleAssets(truncateTs),
            fileName: 'truncate-example',
            component: 'TruncateExampleComponent'
        }
    ];

    truncateText: ExampleFile[] = [
        {
            language: 'TypeScript',
            code: getAssetFromModuleAssets(truncateTextTs),
            fileName: 'truncate-text-example',
            component: 'TruncateTextExampleComponent'
        }
    ];
}
