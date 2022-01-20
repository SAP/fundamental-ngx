import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-example',
    templateUrl: './multi-input-example.component.html'
})
export class MultiInputExampleComponent {
    selected = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry'];
    secondSelected = ['Pineapple'];
    thirdSelected = ['Kiwi'];
    selectedDisabledAutoComplete = ['Kiwi'];

    objectValues = [
        { label: 'Apple', value: 'apple_value' },
        { label: 'Banana', value: 'banana_value' },
        { label: 'Pineapple', value: 'pineapple_value' },
        { label: 'Tomato', value: 'tomato_value' },
        { label: 'Kiwi', value: 'kiwi_value' },
        { label: 'Strawberry', value: 'strawberry_value' },
        { label: 'Blueberry', value: 'blueberry_value' },
        { label: 'Orange', value: 'orange_value' }
    ];
    selectedObjectValues = ['apple_value', 'blueberry_value'];
    objectValuesDisplayFn = (v): string => v.label;
    objectValuesValueFn = (v): string => v.value;
}
