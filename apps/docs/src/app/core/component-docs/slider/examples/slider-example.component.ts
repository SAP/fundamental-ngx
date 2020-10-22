import { Component } from '@angular/core';

@Component({
    selector: 'fd-basic-slider-example',
    templateUrl: './slider-basic-example.component.html'
})
export class SliderBasicExampleComponent {
    width = 50;
    min = 0;
    max = 500;
    step = 1;
    jump = 10;
    value = 23;
    hideProgressBar = false;
    showTicks = true;
    showTicksLabels = true;
    range = false;
    disabled = false;
    readonly = false;
}
