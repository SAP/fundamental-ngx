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

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';

@Component({
    selector: 'ui5-color-palette-docs',
    templateUrl: './color-palette-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicColorPaletteSample
    ]
})
export class ColorPaletteDocs {
    basicColorPaletteSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicColorPaletteSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ];
}
