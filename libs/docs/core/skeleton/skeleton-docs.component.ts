import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { SkeletonComplexExampleComponent } from './examples/complex/skeleton-complex-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { SkeletonComponentExampleComponent } from './examples/component/skeleton-component-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const skeletonComponentHtml = 'component/skeleton-component-example.component.html';
const skeletonComplexHtml = 'complex/skeleton-complex-example.component.html';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        SkeletonComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        SkeletonComplexExampleComponent
    ]
})
export class SkeletonDocsComponent {
    component: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(skeletonComponentHtml),
            fileName: 'skeleton-component-example'
        }
    ];

    complex: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(skeletonComplexHtml),
            fileName: 'skeleton-complex-example'
        }
    ];
}
