import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ScrollbarNoVerticalExampleComponent } from './examples/scrollbar-no-vertical-example.component';
import { ScrollbarNoHorizontalExampleComponent } from './examples/scrollbar-no-horizontal-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ScrollbarExampleComponent } from './examples/scrollbar-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const defaultExampleTs = 'scrollbar-example.component.ts';
const noHorizontalScrollExampleTs = 'scrollbar-no-horizontal-example.component.ts';
const noVerticalScrollExampleTs = 'scrollbar-no-vertical-example.component.ts';

@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ScrollbarExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ScrollbarNoHorizontalExampleComponent,
        ScrollbarNoVerticalExampleComponent
    ]
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
