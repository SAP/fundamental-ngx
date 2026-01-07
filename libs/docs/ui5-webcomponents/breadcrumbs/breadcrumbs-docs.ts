import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BreadcrumbsBasicSample } from './examples/basic-sample';
import { BreadcrumbsDesignSample } from './examples/design';
import { BreadcrumbsOverflowSample } from './examples/overflow';
import { BreadcrumbsSeparatorsSample } from './examples/separators';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const overflowHtml = 'overflow.html';
const overflowTs = 'overflow.ts';
const designHtml = 'design.html';
const designTs = 'design.ts';
const separatorsHtml = 'separators.html';
const separatorsTs = 'separators.ts';

@Component({
    selector: 'ui5-breadcrumbs-docs',
    templateUrl: './breadcrumbs-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BreadcrumbsBasicSample,
        BreadcrumbsOverflowSample,
        BreadcrumbsDesignSample,
        BreadcrumbsSeparatorsSample
    ]
})
export class BreadcrumbsDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BreadcrumbsBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly overflowExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowHtml),
            originalFileName: 'overflow'
        },
        {
            language: 'typescript',
            component: 'BreadcrumbsOverflowSample',
            code: getAssetFromModuleAssets(overflowTs),
            originalFileName: 'overflow'
        }
    ]);

    private readonly designExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designHtml),
            originalFileName: 'design'
        },
        {
            language: 'typescript',
            component: 'BreadcrumbsDesignSample',
            code: getAssetFromModuleAssets(designTs),
            originalFileName: 'design'
        }
    ]);

    private readonly separatorsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(separatorsHtml),
            originalFileName: 'separators'
        },
        {
            language: 'typescript',
            component: 'BreadcrumbsSeparatorsSample',
            code: getAssetFromModuleAssets(separatorsTs),
            originalFileName: 'separators'
        }
    ]);

    basicExamples = computed(() => this.basicExampleFiles());
    overflowExamples = computed(() => this.overflowExampleFiles());
    designExamples = computed(() => this.designExampleFiles());
    separatorsExamples = computed(() => this.separatorsExampleFiles());
}
