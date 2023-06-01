import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-displaywith-example',
    templateUrl: './multi-input-displaywith-example.component.html'
})
export class MultiInputDisplaywithExampleComponent {
    values = [
        { name: 'Apple', value: 'apple_value' },
        { name: 'Banana', value: 'banana_value' },
        { name: 'Pineapple', value: 'pineapple_value' },
        { name: 'Tomato', value: 'tomato_value' },
        { name: 'Kiwi', value: 'kiwi_value' },
        { name: 'Strawberry', value: 'strawberry_value' },
        { name: 'Blueberry', value: 'blueberry_value' },
        { name: 'Orange', value: 'orange_value' }
    ];

    selected = [{ name: 'Banana', value: 'banana_value' }];

    displayFunc(obj: any): string {
        return obj.name.toLocaleUpperCase();
    }

    valueFunc(obj: any): string {
        return obj.value;
    }
}
