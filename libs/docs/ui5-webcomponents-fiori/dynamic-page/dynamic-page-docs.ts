import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DynamicPageAccessibilitySample } from './examples/dynamic-page-accessibility-sample';
import { DynamicPageExample } from './examples/dynamic-page-sample';

const basicSampleHtml = 'dynamic-page-sample.html';
const basicSampleTs = 'dynamic-page-sample.ts';
const accessibilitySampleHtml = 'dynamic-page-accessibility-sample.html';
const accessibilitySampleTs = 'dynamic-page-accessibility-sample.ts';

@Component({
    selector: 'ui5-dynamic-page-docs',
    templateUrl: './dynamic-page-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DynamicPageExample,
        DynamicPageAccessibilitySample
    ]
})
export class DynamicPageDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
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

    private readonly accessibilityExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(accessibilitySampleHtml),
            originalFileName: 'dynamic-page-accessibility-example'
        },
        {
            language: 'typescript',
            component: 'DynamicPageAccessibilitySample',
            code: getAssetFromModuleAssets(accessibilitySampleTs),
            originalFileName: 'dynamic-page-accessibility-example'
        }
    ]);

    readonly examples = computed(() => this.basicExampleFiles());
    readonly accessibilityExamples = computed(() => this.accessibilityExampleFiles());
}
