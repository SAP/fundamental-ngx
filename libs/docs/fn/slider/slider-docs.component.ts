import { Component } from '@angular/core';

const sliderBasicHtml = 'base/slider-basic-example.component.html';
const sliderBasicTs = 'base/slider-basic-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class SliderDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderBasicTs),
            fileName: 'slider-basic-example',
            component: 'SliderBasicExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderBasicHtml),
            fileName: 'slider-basic-example'
        }
    ];
}
