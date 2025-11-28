import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TagBasicSample } from './examples/basic-sample';
import { TagColorSchemesSample } from './examples/color-schemes';
import { TagDesignsSample } from './examples/designs';
import { TagInteractiveSample } from './examples/interactive';
import { TagSizesSample } from './examples/sizes';
import { TagWrappingSample } from './examples/wrapping';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const designsHtml = 'designs.html';
const designsTs = 'designs.ts';
const interactiveHtml = 'interactive.html';
const interactiveTs = 'interactive.ts';
const wrappingHtml = 'wrapping.html';
const wrappingTs = 'wrapping.ts';
const colorSchemesHtml = 'color-schemes.html';
const colorSchemesTs = 'color-schemes.ts';
const sizesHtml = 'sizes.html';
const sizesTs = 'sizes.ts';

@Component({
    selector: 'ui5-tag-docs',
    templateUrl: './tag-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TagBasicSample,
        TagDesignsSample,
        TagInteractiveSample,
        TagWrappingSample,
        TagColorSchemesSample,
        TagSizesSample
    ]
})
export class TagDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'TagBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly designsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designsHtml),
            originalFileName: 'designs'
        },
        {
            language: 'typescript',
            component: 'TagDesignsSample',
            code: getAssetFromModuleAssets(designsTs),
            originalFileName: 'designs'
        }
    ]);

    private readonly interactiveExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(interactiveHtml),
            originalFileName: 'interactive'
        },
        {
            language: 'typescript',
            component: 'TagInteractiveSample',
            code: getAssetFromModuleAssets(interactiveTs),
            originalFileName: 'interactive'
        }
    ]);

    private readonly wrappingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(wrappingHtml),
            originalFileName: 'wrapping'
        },
        {
            language: 'typescript',
            component: 'TagWrappingSample',
            code: getAssetFromModuleAssets(wrappingTs),
            originalFileName: 'wrapping'
        }
    ]);

    private readonly colorSchemesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(colorSchemesHtml),
            originalFileName: 'color-schemes'
        },
        {
            language: 'typescript',
            component: 'TagColorSchemesSample',
            code: getAssetFromModuleAssets(colorSchemesTs),
            originalFileName: 'color-schemes'
        }
    ]);

    private readonly sizesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(sizesHtml),
            originalFileName: 'sizes'
        },
        {
            language: 'typescript',
            component: 'TagSizesSample',
            code: getAssetFromModuleAssets(sizesTs),
            originalFileName: 'sizes'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly designsExamples = computed(() => this.designsExampleFiles());
    readonly interactiveExamples = computed(() => this.interactiveExampleFiles());
    readonly wrappingExamples = computed(() => this.wrappingExampleFiles());
    readonly colorSchemesExamples = computed(() => this.colorSchemesExampleFiles());
    readonly sizesExamples = computed(() => this.sizesExampleFiles());
}
