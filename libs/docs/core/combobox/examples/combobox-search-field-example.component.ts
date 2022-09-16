import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-search-field-example',
    templateUrl: './combobox-search-field-example.component.html'
})
export class ComboboxSearchFieldExampleComponent {
    searchTerm = '';
    fruits = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Blueberry',
        'Orange',
        'Lemon',
        'Raspberry',
        'Grapefruit',
        'Apricot',
        'Avocado',
        'Cherry'
    ];
}
