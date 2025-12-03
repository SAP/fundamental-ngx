import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { DisabledSample } from './examples/disabled-sample';
import { StepTickmarksSample } from './examples/step-tickmarks-sample';
import { TooltipSample } from './examples/tooltip-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const stepTickmarksSampleTs = 'step-tickmarks-sample.ts';
const stepTickmarksSampleHtml = 'step-tickmarks-sample.html';
const tooltipSampleTs = 'tooltip-sample.ts';
const tooltipSampleHtml = 'tooltip-sample.html';
const disabledSampleTs = 'disabled-sample.ts';
const disabledSampleHtml = 'disabled-sample.html';

@Component({
    selector: 'ui5-doc-range-slider',
    templateUrl: './range-slider-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        StepTickmarksSample,
        TooltipSample,
        DisabledSample
    ]
})
export class RangeSliderDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        }
    ]);

    stepTickmarksExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(stepTickmarksSampleTs),
            originalFileName: 'step-tickmarks-sample',
            component: 'StepTickmarksSample',
            typescriptFileCode: getAssetFromModuleAssets(stepTickmarksSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(stepTickmarksSampleHtml),
            originalFileName: 'step-tickmarks-sample'
        }
    ]);

    tooltipExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(tooltipSampleTs),
            originalFileName: 'tooltip-sample',
            component: 'TooltipSample',
            typescriptFileCode: getAssetFromModuleAssets(tooltipSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(tooltipSampleHtml),
            originalFileName: 'tooltip-sample'
        }
    ]);

    disabledExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(disabledSampleTs),
            originalFileName: 'disabled-sample',
            component: 'DisabledSample',
            typescriptFileCode: getAssetFromModuleAssets(disabledSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledSampleHtml),
            originalFileName: 'disabled-sample'
        }
    ]);
}
