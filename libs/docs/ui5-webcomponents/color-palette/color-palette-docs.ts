import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicColorPaletteSample } from './examples/basic-sample';
import { ItemClickColorPaletteSample } from './examples/item-click-sample';
import { TooltipColorPaletteSample } from './examples/tooltip-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const itemClickSampleHtml = 'item-click-sample.html';
const itemClickSampleTs = 'item-click-sample.ts';
const tooltipSampleHtml = 'tooltip-sample.html';
const tooltipSampleTs = 'tooltip-sample.ts';

@Component({
    selector: 'ui5-color-palette-docs',
    templateUrl: './color-palette-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicColorPaletteSample,
        ItemClickColorPaletteSample,
        TooltipColorPaletteSample
    ]
})
export class ColorPaletteDocs {
    basicColorPaletteSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicColorPaletteSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ];

    itemClickSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(itemClickSampleHtml),
            originalFileName: 'item-click-sample'
        },
        {
            language: 'typescript',
            component: 'ItemClickColorPaletteSample',
            code: getAssetFromModuleAssets(itemClickSampleTs),
            originalFileName: 'item-click-sample'
        }
    ];

    tooltipSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tooltipSampleHtml),
            originalFileName: 'tooltip-sample'
        },
        {
            language: 'typescript',
            component: 'TooltipColorPaletteSample',
            code: getAssetFromModuleAssets(tooltipSampleTs),
            originalFileName: 'tooltip-sample'
        }
    ];
}
