import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicBusyIndicatorSample } from './examples/basic-sample';
import { DelayBusyIndicatorSample } from './examples/delay';
import { SizesBusyIndicatorSample } from './examples/sizes';
import { TextPlacementBusyIndicatorSample } from './examples/text-placement';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';

@Component({
    selector: 'ui5-busy-indicator-docs',
    templateUrl: './busy-indicator-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicBusyIndicatorSample,
        SizesBusyIndicatorSample,
        TextPlacementBusyIndicatorSample,
        DelayBusyIndicatorSample
    ]
})
export class BusyIndicatorDocs {
    basicBusyIndicatorSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicBusyIndicatorSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ];

    sizesBusyIndicatorSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('sizes.html'),
            fileName: 'sizes'
        },
        {
            language: 'typescript',
            component: 'SizesBusyIndicatorSample',
            code: getAssetFromModuleAssets('sizes.ts'),
            fileName: 'sizes'
        }
    ];

    textPlacementBusyIndicatorSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('text-placement.html'),
            fileName: 'text-placement'
        },
        {
            language: 'typescript',
            component: 'TextPlacementBusyIndicatorSample',
            code: getAssetFromModuleAssets('text-placement.ts'),
            fileName: 'text-placement'
        }
    ];

    delayBusyIndicatorSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('delay.html'),
            fileName: 'delay'
        },
        {
            language: 'typescript',
            component: 'DelayBusyIndicatorSample',
            code: getAssetFromModuleAssets('delay.ts'),
            fileName: 'delay'
        }
    ];
}
