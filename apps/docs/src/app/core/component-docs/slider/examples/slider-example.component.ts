import { Component } from '@angular/core';

@Component({
    selector: 'fd-basic-slider-example',
    templateUrl: './slider-basic-example.component.html'
})
export class SliderBasicExampleComponent {
    min = 10;
    max = 120;
    step = 1;
    jump = 10;
    value = 23;
    hideProgressBar = false;
    showTicks = true;
    disabled = false;
    readonly = false;
}
