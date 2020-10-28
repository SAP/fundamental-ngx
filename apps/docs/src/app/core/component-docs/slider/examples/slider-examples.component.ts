import { Component } from '@angular/core';

@Component({
    selector: 'fd-slider-basic-example',
    templateUrl: './slider-basic-example.component.html'
})
export class SliderBasicExampleComponent {
    value = 50;
}

@Component({
    selector: 'fd-slider-range-example',
    templateUrl: './slider-range-example.component.html'
})
export class SliderRangeExampleComponent {
    value = [20, 70];
}

@Component({
    selector: 'fd-slider-ticks-example',
    templateUrl: './slider-ticks-example.component.html'
})
export class SliderTicksExampleComponent {
    value = 40;
}

@Component({
    selector: 'fd-slider-ticks-and-labels-example',
    templateUrl: './slider-ticks-and-labels-example.component.html'
})
export class SliderTicksAndLabelsExampleComponent {
    value = 40;
    customLabels = [
        { value: 0, label: '0' },
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 40, label: '40' },
        { value: 50, label: '50' },
        { value: 60, label: '60' },
        { value: 70, label: '70' },
        { value: 80, label: '80' },
        { value: 90, label: '90' },
        { value: 100, label: '100' }
    ];
}

@Component({
    selector: 'fd-slider-playground-example',
    templateUrl: './slider-playground-example.component.html'
})
export class SliderPlaygroundExampleComponent {
    width = 50;
    min = 0;
    max = 100;
    step = 10;
    jump = 20;
    value = 23;
    hideProgressBar = false;
    showTicks = true;
    showTicksLabels = true;
    range = false;
    disabled = false;
    readonly = false;
    showCustomLabels = false;
    customLabels = [];
}
