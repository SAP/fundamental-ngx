import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ColorPalettePopoverBasicSample } from './examples/basic-sample';
import { ColorPalettePopoverDefaultColorSample } from './examples/default-color';
import { ColorPalettePopoverMoreColorsSample } from './examples/more-colors';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const defaultColorHtml = 'default-color.html';
const defaultColorTs = 'default-color.ts';
const moreColorsHtml = 'more-colors.html';
const moreColorsTs = 'more-colors.ts';

@Component({
    selector: 'ui5-color-palette-popover-docs',
    templateUrl: './color-palette-popover-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        ColorPalettePopoverBasicSample,
        ColorPalettePopoverDefaultColorSample,
        ColorPalettePopoverMoreColorsSample
    ]
})
export class ColorPalettePopoverDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'ColorPalettePopoverBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly defaultColorExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultColorHtml),
            originalFileName: 'default-color'
        },
        {
            language: 'typescript',
            component: 'ColorPalettePopoverDefaultColorSample',
            code: getAssetFromModuleAssets(defaultColorTs),
            originalFileName: 'default-color'
        }
    ]);

    private readonly moreColorsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(moreColorsHtml),
            originalFileName: 'more-colors'
        },
        {
            language: 'typescript',
            component: 'ColorPalettePopoverMoreColorsSample',
            code: getAssetFromModuleAssets(moreColorsTs),
            originalFileName: 'more-colors'
        }
    ]);

    basicExamples = computed(() => this.basicExampleFiles());
    defaultColorExamples = computed(() => this.defaultColorExampleFiles());
    moreColorsExamples = computed(() => this.moreColorsExampleFiles());
}
