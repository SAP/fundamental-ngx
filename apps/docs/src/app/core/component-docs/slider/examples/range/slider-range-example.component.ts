import { Component } from '@angular/core';

@Component({
    selector: 'fd-slider-range-example',
    templateUrl: './slider-range-example.component.html'
})
export class SliderRangeExampleComponent {
    value = [20, 70];

    customValues = [
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

    value2 = [this.customValues[4], this.customValues[6]];
}
