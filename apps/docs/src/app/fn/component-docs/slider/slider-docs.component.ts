import { Component } from '@angular/core';

import * as sliderBasicHtml from '!raw-loader!./examples/base/slider-basic-example.component.html';
import * as sliderBasicTs from '!raw-loader!./examples/base/slider-basic-example.component';

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
