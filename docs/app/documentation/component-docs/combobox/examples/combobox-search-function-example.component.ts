import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-search-function-example',
    templateUrl: 'combobox-search-function-example.component.html'
})
export class ComboboxSearchFunctionExampleComponent {

    searchTerm: string = '';

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry'
    ];

    customSearchFunction: Function = () => {
        alert('Custom Function Called');
    };


}
