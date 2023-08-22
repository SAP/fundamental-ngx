import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { TruncateTextExampleComponent } from './examples/truncate-text-example.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { TruncateExampleComponent } from './examples/truncate-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const truncateTs = 'truncate-example.component.ts';
const truncateTextTs = 'truncate-text-example.component.ts';

@Component({
    selector: 'app-truncate',
    templateUrl: './truncate-docs.component.html',
    standalone: true,
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
