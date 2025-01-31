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
import { SkeletonComplexExampleComponent } from './examples/complex/skeleton-complex-example.component';
import { SkeletonComponentExampleComponent } from './examples/component/skeleton-component-example.component';

const skeletonComponentHtml = 'component/skeleton-component-example.component.html';
const skeletonComplexHtml = 'complex/skeleton-complex-example.component.html';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton-docs.component.html',
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
