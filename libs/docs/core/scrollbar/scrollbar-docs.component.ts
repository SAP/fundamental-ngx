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
import { ScrollbarExampleComponent } from './examples/scrollbar-example.component';
import { ScrollbarNoHorizontalExampleComponent } from './examples/scrollbar-no-horizontal-example.component';
import { ScrollbarNoVerticalExampleComponent } from './examples/scrollbar-no-vertical-example.component';

const defaultExampleTs = 'scrollbar-example.component.ts';
const noHorizontalScrollExampleTs = 'scrollbar-no-horizontal-example.component.ts';
const noVerticalScrollExampleTs = 'scrollbar-no-vertical-example.component.ts';

@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar-docs.component.html',
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
