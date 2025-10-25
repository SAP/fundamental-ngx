import { Component } from '@angular/core';
import { SliderExample } from './examples/slider-sample';

@Component({
    selector: 'ui5-slider-docs',
    templateUrl: './slider-docs.html',
    standalone: true,
    imports: [SliderExample]
})
export class SliderDocsComponent {}
