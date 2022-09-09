import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-height-example',
    templateUrl: './combobox-height-example.component.html'
})
export class ComboboxHeightExampleComponent {
    searchTermOne = '';

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Raspberries',
        'Watermelons',
        'Nectarines',
        'Oranges',
        'Pear',
        'Grape',
        'Cherry',
        'Blueberry',
        'Avocado',
        'Fig',
        'Pomegranate'
    ];
}
