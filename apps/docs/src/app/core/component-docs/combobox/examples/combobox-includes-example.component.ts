import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-includes-example',
    templateUrl: './combobox-includes-example.component.html'
})
export class ComboboxIncludesExampleComponent {
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
