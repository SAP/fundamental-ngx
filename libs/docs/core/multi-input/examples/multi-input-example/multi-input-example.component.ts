import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-example',
    templateUrl: './multi-input-example.component.html',
    imports: [MultiInputComponent, FormsModule, JsonPipe]
})
export class MultiInputExampleComponent {
    selected = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry'];
    secondSelected = ['Pineapple'];
    thirdSelected = ['Kiwi'];
    readonlySelected = [
        'Apple',
        'Banana',
        'Pineapple',
        'Tomato',
        'Kiwi',
        'Strawberry',
        'Blueberry',
        'Orange',
        'Mango',
        'Grapes',
        'Peach',
        'Pear',
        'Plum',
        'Cherry'
    ];
    selectedDisabledAutoComplete = ['Kiwi'];

    objectValues = [
        { label: 'Apple', value: 'apple_value' },
        { label: 'Banana', value: 'banana_value' },
        { label: 'Pineapple', value: 'pineapple_value' },
        { label: 'Tomato', value: 'tomato_value' },
        { label: 'Kiwi', value: 'kiwi_value' },
        { label: 'Strawberry', value: 'strawberry_value' },
        { label: 'Blueberry', value: 'blueberry_value' },
        { label: 'Orange', value: 'orange_value' },
        { label: 'Mango', value: 'mango_value' },
        { label: 'Grapes', value: 'grapes_value' },
        { label: 'Peach', value: 'peach_value' },
        { label: 'Pear', value: 'pear_value' },
        { label: 'Plum', value: 'plum_value' },
        { label: 'Cherry', value: 'cherry_value' },
        { label: 'Watermelon', value: 'watermelon_value' },
        { label: 'Lemon', value: 'lemon_value' },
        { label: 'Lime', value: 'lime_value' },
        { label: 'Coconut', value: 'coconut_value' },
        { label: 'Pineapple', value: 'pineapple_value' },
        { label: 'Papaya', value: 'papaya_value' }
    ];
    selectedObjectValues = ['apple_value', 'blueberry_value'];
    objectValuesDisplayFn = (v): string => v.label;
    objectValuesValueFn = (v): string => v.value;

    searchTermChange(text: string): void {
        console.log(text);
    }
}
