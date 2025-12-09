import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { FlexibleColumnLayoutSample } from './examples/flexible-column-layout-sample';

const basicSampleHtml = 'flexible-column-layout-sample.html';
const basicSampleTs = 'flexible-column-layout-sample.ts';

@Component({
    selector: 'ui5-flexible-column-layout-docs',
    templateUrl: './flexible-column-layout-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        FlexibleColumnLayoutSample
    ]
})
export class FlexibleColumnLayoutDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'flexible-column-layout-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'flexible-column-layout-sample',
            component: 'FlexibleColumnLayoutSample'
        }
    ]);
    readonly examples = computed(() => this.exampleFiles());
}
