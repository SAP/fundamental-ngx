import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { InfiniteScrollBasicExampleComponent } from './examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const basicInfiniteTs = 'infinite-scroll-basic-example/infinite-scroll-basic-example.component.ts';
const basicInfiniteHtml = 'infinite-scroll-basic-example/infinite-scroll-basic-example.component.html';

@Component({
    selector: 'infinite-scroll-docs',
    templateUrl: './infinite-scroll-docs.component.html',
    standalone: true,
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
