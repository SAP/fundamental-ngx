import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const skeletonComponentHtml = 'component/skeleton-component-example.component.html';
const skeletonComplexHtml = 'complex/skeleton-complex-example.component.html';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton-docs.component.html'
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
