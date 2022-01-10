import { Component } from '@angular/core';

import sliderBasicHtml from '!./examples/base/slider-basic-example.component.html?raw';
import sliderBasicTs from '!./examples/base/slider-basic-example.component?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class SliderDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderBasicTs,
            fileName: 'slider-basic-example',
            component: 'SliderBasicExampleComponent'
        },
        {
            language: 'html',
            code: sliderBasicHtml,
            fileName: 'slider-basic-example'
        }
    ];
}
