import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ColorPickerBasicExample } from './examples/basic-sample';
import { ColorPickerSimplifiedExample } from './examples/simplified';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const simplifiedHtml = 'simplified.html';
const simplifiedTs = 'simplified.ts';

@Component({
    selector: 'ui5-color-picker-docs',
    templateUrl: './color-picker-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        ColorPickerBasicExample,
        ColorPickerSimplifiedExample
    ]
})
export class ColorPickerDocs {
    readonly basicSamples = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'color-picker-basic-example'
        },
        {
            language: 'typescript',
            component: 'ColorPickerBasicExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'color-picker-basic-example'
        }
    ]);

    readonly simplifiedSamples = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(simplifiedHtml),
            fileName: 'color-picker-simplified-example'
        },
        {
            language: 'typescript',
            component: 'ColorPickerSimplifiedExample',
            code: getAssetFromModuleAssets(simplifiedTs),
            fileName: 'color-picker-simplified-example'
        }
    ]);
}
