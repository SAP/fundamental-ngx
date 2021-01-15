import { Component } from '@angular/core';

@Component({
    selector: 'fd-slider-basic-example',
    templateUrl: './slider-basic-example.component.html'
})
export class SliderBasicExampleComponent {
    value = 50;
    value1 = 50;
    value2 = 50;
    value3 = 50;
    value4 = 50;
    value5 = 50;
    value7 = -50;

    customValues = [
        { value: 'asd 1', label: 'Test 1' },
        { value: 'asd 2', label: 'Test 2' },
        { value: 'asd 3', label: 'Test 3' },
        { value: 'asd 4', label: 'Test 4' },
        { value: 'asd 5', label: 'Test 5' },
        { value: 'asd 6', label: 'Test 6' },
        { value: 'asd 7', label: 'Test 7' },
        { value: 'asd 8', label: 'Test 8' },
        { value: 'asd 9', label: 'Test 9' },
        { value: 'asd 10', label: 'Test 10' },
        { value: 'asd 11', label: 'Test 11' }
    ];

    value6 = this.customValues[4];
}
