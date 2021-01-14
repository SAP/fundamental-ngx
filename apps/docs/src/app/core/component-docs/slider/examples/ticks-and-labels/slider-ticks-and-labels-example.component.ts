import { Component } from '@angular/core';

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
