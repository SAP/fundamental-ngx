import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TextBasicSample } from './examples/basic-sample';
import { TextCustomStylingSample } from './examples/custom-styling';
import { TextEmptyIndicatorSample } from './examples/empty-indicator';
import { TextHyphenationSample } from './examples/hyphenation';
import { TextMaxLinesSample } from './examples/max-lines';
import { WhiteSpaceSample } from './examples/white-space';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const maxLinesHtml = 'max-lines.html';
const maxLinesTs = 'max-lines.ts';
const emptyIndicatorHtml = 'empty-indicator.html';
const emptyIndicatorTs = 'empty-indicator.ts';
const customStylingHtml = 'custom-styling.html';
const customStylingTs = 'custom-styling.ts';
const whiteSpaceHtml = 'white-space.html';
const whiteSpaceTs = 'white-space.ts';
const hyphenationHtml = 'hyphenation.html';
const hyphenationTs = 'hyphenation.ts';

@Component({
    selector: 'ui5-text-docs',
    templateUrl: './text-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TextBasicSample,
        TextMaxLinesSample,
        TextEmptyIndicatorSample,
        TextCustomStylingSample,
        WhiteSpaceSample,
        TextHyphenationSample
    ]
})
export class TextDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'TextBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly maxLinesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(maxLinesHtml),
            originalFileName: 'max-lines'
        },
        {
            language: 'typescript',
            component: 'TextMaxLinesSample',
            code: getAssetFromModuleAssets(maxLinesTs),
            originalFileName: 'max-lines'
        }
    ]);

    private readonly emptyIndicatorExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(emptyIndicatorHtml),
            originalFileName: 'empty-indicator'
        },
        {
            language: 'typescript',
            component: 'TextEmptyIndicatorSample',
            code: getAssetFromModuleAssets(emptyIndicatorTs),
            originalFileName: 'empty-indicator'
        }
    ]);

    private readonly customStylingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customStylingHtml),
            originalFileName: 'custom-styling'
        },
        {
            language: 'typescript',
            component: 'TextCustomStylingSample',
            code: getAssetFromModuleAssets(customStylingTs),
            originalFileName: 'custom-styling'
        }
    ]);

    private readonly whiteSpaceExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(whiteSpaceHtml),
            originalFileName: 'white-space'
        },
        {
            language: 'typescript',
            component: 'WhiteSpaceSample',
            code: getAssetFromModuleAssets(whiteSpaceTs),
            originalFileName: 'white-space'
        }
    ]);

    private readonly hyphenationExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(hyphenationHtml),
            originalFileName: 'hyphenation'
        },
        {
            language: 'typescript',
            component: 'TextHyphenationSample',
            code: getAssetFromModuleAssets(hyphenationTs),
            originalFileName: 'hyphenation'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly maxLinesExamples = computed(() => this.maxLinesExampleFiles());
    readonly emptyIndicatorExamples = computed(() => this.emptyIndicatorExampleFiles());
    readonly customStylingExamples = computed(() => this.customStylingExampleFiles());
    readonly whiteSpaceExamples = computed(() => this.whiteSpaceExampleFiles());
    readonly hyphenationExamples = computed(() => this.hyphenationExampleFiles());
}
