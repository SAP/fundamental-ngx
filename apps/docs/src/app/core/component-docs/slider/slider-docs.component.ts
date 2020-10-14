import { Component } from '@angular/core';

import * as sliderHtml from '!raw-loader!./examples/slider-basic-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class SliderDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: sliderHtml,
            fileName: 'core-object-number-basic-example'
        }
    ];
}
