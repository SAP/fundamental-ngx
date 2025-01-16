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
import { OverflowLayoutAlwaysVisibleExampleComponent } from './examples/always-visible/overflow-layout-always-visible-example.component';
import { OverflowLayoutComplexExampleComponent } from './examples/complex/overflow-layout-complex-example.component';
import { OverflowLayoutDefaultExampleComponent } from './examples/default/overflow-layout-default-example.component';

const overflowLayoutComplexExampleScss = 'complex/overflow-layout-complex-example.component.scss';
const overflowLayoutDefaultExampleHtml = 'default/overflow-layout-default-example.component.html';
const overflowLayoutDefaultExampleTs = 'default/overflow-layout-default-example.component.ts';

const overflowLayoutComplexExampleHtml = 'complex/overflow-layout-complex-example.component.html';
const overflowLayoutComplexExampleTs = 'complex/overflow-layout-complex-example.component.ts';
const avatarGeneratorExampleService = 'complex/avatar-generator-example.service.ts';
const overflowLayoutVisibleItemsExampleHtml = 'always-visible/overflow-layout-always-visible-example.component.html';
const overflowLayoutVisibleItemsExampleTs = 'always-visible/overflow-layout-always-visible-example.component.ts';

@Component({
    selector: 'app-overflow-layout',
    templateUrl: './overflow-layout-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        OverflowLayoutDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        OverflowLayoutAlwaysVisibleExampleComponent,
        OverflowLayoutComplexExampleComponent
    ]
})
export class OverflowLayoutDocsComponent {
    overflowLayoutDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowLayoutDefaultExampleHtml),
            fileName: 'overflow-layout-default-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(overflowLayoutDefaultExampleTs),
            fileName: 'overflow-layout-default-example',
            component: 'OverflowLayoutDefaultExampleComponent'
        }
    ];

    overflowLayoutComplexExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowLayoutComplexExampleHtml),
            fileName: 'overflow-layout-complex-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(overflowLayoutComplexExampleTs),
            fileName: 'overflow-layout-complex-example',
            component: 'OverflowLayoutComplexExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(overflowLayoutComplexExampleScss),
            fileName: 'overflow-layout-complex-example'
        }
    ];

    overflowLayoutVisibleItemsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowLayoutVisibleItemsExampleHtml),
            fileName: 'overflow-layout-always-visible-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(overflowLayoutVisibleItemsExampleTs),
            fileName: 'overflow-layout-always-visible-example',
            component: 'OverflowLayoutAlwaysVisibleExampleComponent'
        }
    ];
}
