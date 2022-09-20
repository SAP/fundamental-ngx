import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const skeletonDirectiveHtml = 'directive/skeleton-template-directive-example.component.html';
const skeletonDirectiveTs = 'directive/skeleton-template-directive-example.component.ts';
const skeletonConsumerDirectiveTs = 'directive/skeleton-consumer-example.component.ts';
const skeletonComponentHtml = 'component/skeleton-component-example.component.html';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton-docs.component.html'
})
export class SkeletonDocsComponent {
    directive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(skeletonDirectiveHtml),
            fileName: 'skeleton-template-directive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(skeletonDirectiveTs),
            fileName: 'skeleton-template-directive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(skeletonConsumerDirectiveTs),
            fileName: 'skeleton-consumer-example',
            name: 'Skeleton consumer'
        }
    ];

    component: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(skeletonComponentHtml),
            fileName: 'skeleton-component-example'
        }
    ];
}
