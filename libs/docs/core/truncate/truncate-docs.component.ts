import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TruncateExampleComponent } from './examples/truncate-example.component';
import { TruncateTextExampleComponent } from './examples/truncate-text-example.component';

const truncateTs = 'truncate-example.component.ts';
const truncateTextTs = 'truncate-text-example.component.ts';

@Component({
    selector: 'app-truncate',
    templateUrl: './truncate-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TruncateExampleComponent,
        CodeExampleComponent,
        TruncateTextExampleComponent
    ]
})
export class TruncateDocsComponent {
    truncate: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(truncateTs),
            fileName: 'truncate-example',
            component: 'TruncateExampleComponent'
        }
    ];

    truncateText: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(truncateTextTs),
            fileName: 'truncate-text-example',
            component: 'TruncateTextExampleComponent'
        }
    ];
}
