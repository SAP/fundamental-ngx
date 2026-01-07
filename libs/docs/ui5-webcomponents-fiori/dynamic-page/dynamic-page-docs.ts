import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DynamicPageExample } from './examples/dynamic-page-sample';

const basicSampleHtml = 'dynamic-page-sample.html';
const basicSampleTs = 'dynamic-page-sample.ts';

@Component({
    selector: 'ui5-dynamic-page-docs',
    templateUrl: './dynamic-page-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DynamicPageExample
    ]
})
export class DynamicPageDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'dynamic-page-example'
        },
        {
            language: 'typescript',
            component: 'DynamicPageExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'dynamic-page-example'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
}
