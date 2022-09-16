import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-search-function-example',
    templateUrl: 'combobox-search-function-example.component.html'
})
export class ComboboxSearchFunctionExampleComponent {
    searchTerm = '';

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Raspberries',
        'Watermelons',
        'Nectarines',
        'Oranges'
    ];

    customSearchFunction = (): void => {
        alert('Custom Function Called');
    };
}
