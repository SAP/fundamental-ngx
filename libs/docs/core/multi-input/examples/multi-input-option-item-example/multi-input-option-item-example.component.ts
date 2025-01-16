import { Component } from '@angular/core';
import { MultiInputComponent, OptionItem } from '@fundamental-ngx/core/multi-input';

interface Item {
    value: string;
    label: string;
}

@Component({
    selector: 'fd-multi-input-option-item-example',
    template: `
        <fd-multi-input placeholder="Search here..." [selected]="selected" [dropdownValues]="objectValues">
        </fd-multi-input>
    `,
    imports: [MultiInputComponent]
})
export class MultiInputOptionItemExampleComponent {
    selected = [
        'apple_value',
        'banana_value',
        'pineapple_value',
        'tomato_value',
        'kiwi_value',
        'strawberry_value',
        'blueberry_value'
    ];

    objectValues: OptionItem<Item, string>[] = [
        { label: 'Apple', value: 'apple_value' },
        { label: 'Banana', value: 'banana_value' },
        { label: 'Pineapple', value: 'pineapple_value' },
        { label: 'Tomato', value: 'tomato_value' },
        { label: 'Kiwi', value: 'kiwi_value' },
        { label: 'Strawberry', value: 'strawberry_value' },
        { label: 'Blueberry', value: 'blueberry_value' },
        { label: 'Orange', value: 'orange_value' }
    ].map((item, index) => {
        return {
            id: index,
            ...item,
            item
        };
    });
    constructor() {}
}
