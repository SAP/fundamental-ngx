import { Component } from '@angular/core';

import * as sliderBasicHtml from '!raw-loader!./examples/slider-basic-example.component.html';
import * as sliderRangeHtml from '!raw-loader!./examples/slider-range-example.component.html';
import * as sliderTicksHtml from '!raw-loader!./examples/slider-ticks-example.component.html';
import * as sliderTicksAndLabelsHtml from '!raw-loader!./examples/slider-ticks-and-labels-example.component.html';
import * as sliderPlaygroundHtml from '!raw-loader!./examples/slider-playground-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class SliderDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: sliderBasicHtml,
            fileName: 'core-object-number-basic-example'
        }
    ];
    range: ExampleFile[] = [
        {
            language: 'html',
            code: sliderRangeHtml,
            fileName: 'core-object-number-range-example'
        }
    ];
    ticks: ExampleFile[] = [
        {
            language: 'html',
            code: sliderTicksHtml,
            fileName: 'core-object-number-ticks-example'
        }
    ];
    ticksAndLabels: ExampleFile[] = [
        {
            language: 'html',
            code: sliderTicksAndLabelsHtml,
            fileName: 'core-object-number-ticks-and-labels-example'
        }
    ];
    playground: ExampleFile[] = [
        {
            language: 'html',
            code: sliderPlaygroundHtml,
            fileName: 'core-object-number-playground-example'
        }
    ];
}
