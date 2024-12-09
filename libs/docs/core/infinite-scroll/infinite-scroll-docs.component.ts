import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { InfiniteScrollBasicExampleComponent } from './examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component';

const basicInfiniteTs = 'infinite-scroll-basic-example/infinite-scroll-basic-example.component.ts';
const basicInfiniteHtml = 'infinite-scroll-basic-example/infinite-scroll-basic-example.component.html';

@Component({
    selector: 'infinite-scroll-docs',
    templateUrl: './infinite-scroll-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        InfiniteScrollBasicExampleComponent,
        CodeExampleComponent
    ]
})
export class InfiniteScrollDocsComponent {
    basicInfiniteExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicInfiniteHtml),
            fileName: 'infinite-scroll-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicInfiniteTs),
            fileName: 'infinite-scroll-basic-example',
            component: 'InfiniteScrollBasicExampleComponent'
        }
    ];
}
