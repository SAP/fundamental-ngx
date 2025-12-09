import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DynamicSideContentSample } from './examples/dynamic-side-content-sample';

const basicSampleHtml = 'dynamic-side-content-sample.html';
const basicSampleTs = 'dynamic-side-content-sample.ts';

@Component({
    selector: 'ui5-dynamic-side-content-docs',
    templateUrl: './dynamic-side-content-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DynamicSideContentSample
    ]
})
export class DynamicSideContentDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'dynamic-side-content-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'dynamic-side-content-sample',
            component: 'DynamicSideContentSample'
        }
    ]);
    readonly examples = computed(() => this.exampleFiles());
}
